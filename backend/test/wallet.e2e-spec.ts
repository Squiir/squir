import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@prisma/prisma.service";
import request from "supertest";
import { AppModule } from "./../src/app.module";

describe("Wallet (e2e)", () => {
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
      where: { email: "test-wallet@example.com" },
    });
    await prisma.bar.deleteMany({ where: { name: "Test Bar Wallet" } });

    const user = await prisma.user.create({
      data: {
        email: "test-wallet@example.com",
        username: "testwallet",
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
        name: "Test Bar Wallet",
        address: "123 Test St",
        arrondissement: 1,
        latitude: 48.0,
        longitude: 2.0,
        color: "#000000",
      },
    });
    barId = bar.id;

    const offer = await prisma.offer.create({
      data: {
        name: "Test Offer Wallet",
        originalPrice: 20,
        squirPrice: 10,
        barId: bar.id,
      },
    });
    offerId = offer.id;

    await prisma.qRCode.createMany({
      data: [
        { userId, offerId, used: false },
        { userId, offerId, used: false },
      ],
    });

    await prisma.qRCode.create({
      data: {
        userId,
        offerId,
        used: true,
        consumedAt: new Date(),
      },
    });
  });

  afterAll(async () => {
    if (prisma) {
      await prisma.qRCode.deleteMany({ where: { userId } });
      await prisma.offer.delete({ where: { id: offerId } }).catch(() => {});
      await prisma.bar.delete({ where: { id: barId } }).catch(() => {});
      await prisma.user.delete({ where: { id: userId } }).catch(() => {});
      await app.close();
    }
  });

  it("/users/wallet (GET) - Get Wallet Active and History", async () => {
    const res = await request(app.getHttpServer())
      .get("/users/wallet")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(res.body).toHaveProperty("active");
    expect(res.body).toHaveProperty("history");

    expect(res.body.active).toHaveLength(1);
    expect(res.body.active[0].offerId).toBe(offerId);
    expect(res.body.active[0].quantity).toBe(2);
    expect(res.body.active[0].qrCodes).toHaveLength(2);

    expect(res.body.history).toHaveLength(1);
    expect(res.body.history).toHaveLength(1);
    expect(res.body.history[0].offerName).toBe("Test Offer Wallet");
    expect(res.body.history[0].status).toContain("Utilisé le");
  });
});
