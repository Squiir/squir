import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { PrismaService } from "../prisma/prisma.service";
import { AppModule } from "./../src/app.module";

describe("Favorites (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;
  let userId: string;
  let token: string;
  let barId: string;
  let offerId: string;

  beforeAll(async () => {
    process.env.ACCESS_TOKEN_SECRET = "test_secret";
    process.env.REFRESH_TOKEN_SECRET = "test_refresh_secret";
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
    jwtService = app.get<JwtService>(JwtService);

    await prisma.user.deleteMany({
      where: { email: "test-favorites@example.com" },
    });
    await prisma.bar.deleteMany({ where: { name: "Test Bar Favorites" } });

    const user = await prisma.user.create({
      data: {
        email: "test-favorites@example.com",
        username: "testfav",
        password: "hashedpassword",
        birthDate: new Date(),
        role: "CUSTOMER",
      },
    });
    userId = user.id;

    token = jwtService.sign(
      { sub: userId, username: user.username },
      { secret: process.env.ACCESS_TOKEN_SECRET },
    );
    const bar = await prisma.bar.create({
      data: {
        name: "Test Bar Favorites",
        address: "123 Test St",
        arrondissement: 11,
        latitude: 48.8,
        longitude: 2.3,
        color: "#ffffff",
      },
    });
    barId = bar.id;

    const offer = await prisma.offer.create({
      data: {
        name: "Test Offer Favorites",
        originalPrice: 10,
        squirPrice: 5,
        barId: bar.id,
      },
    });
    offerId = offer.id;
  });

  afterAll(async () => {
    if (prisma) {
      await prisma.userSavedOffer.deleteMany({ where: { userId } });
      await prisma.userFavoriteVenue.deleteMany({ where: { userId } });
      await prisma.offer.delete({ where: { id: offerId } }).catch(() => {});
      await prisma.bar.delete({ where: { id: barId } }).catch(() => {});
      await prisma.user.delete({ where: { id: userId } }).catch(() => {});
      await app.close();
    }
  });

  it("/users/favorites/venues/:id (POST) - Toggle Favorite Venue", async () => {
    let res = await request(app.getHttpServer())
      .post(`/users/favorites/venues/${barId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(201);

    expect(res.body.isFavorite).toBe(true);

    res = await request(app.getHttpServer())
      .post(`/users/favorites/venues/${barId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(201);

    expect(res.body.isFavorite).toBe(false);
  });

  it("/users/favorites/offers/:id (POST) - Toggle Saved Offer", async () => {
    let res = await request(app.getHttpServer())
      .post(`/users/favorites/offers/${offerId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(201);

    expect(res.body.isSaved).toBe(true);

    res = await request(app.getHttpServer())
      .post(`/users/favorites/offers/${offerId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(201);

    expect(res.body.isSaved).toBe(false);
  });

  it("/users/profile/favorites (GET) - Get Favorites", async () => {
    await request(app.getHttpServer())
      .post(`/users/favorites/venues/${barId}`)
      .set("Authorization", `Bearer ${token}`);

    await request(app.getHttpServer())
      .post(`/users/favorites/offers/${offerId}`)
      .set("Authorization", `Bearer ${token}`);

    const res = await request(app.getHttpServer())
      .get("/users/profile/favorites")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty("favoriteVenues");
    expect(res.body).toHaveProperty("savedOffers");
    expect(res.body.favoriteVenues).toHaveLength(1);
    expect(res.body.savedOffers).toHaveLength(1);

    expect(res.body.favoriteVenues[0].id).toBe(barId);
    expect(res.body.savedOffers[0].id).toBe(offerId);
    expect(res.body.savedOffers[0].venueName).toBe("Test Bar Favorites");
  });
});
