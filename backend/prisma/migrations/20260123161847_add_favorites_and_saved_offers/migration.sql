-- CreateTable
CREATE TABLE "UserFavoriteVenue" (
    "userId" TEXT NOT NULL,
    "barId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFavoriteVenue_pkey" PRIMARY KEY ("userId","barId")
);

-- CreateTable
CREATE TABLE "UserSavedOffer" (
    "userId" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSavedOffer_pkey" PRIMARY KEY ("userId","offerId")
);

-- CreateIndex
CREATE INDEX "UserFavoriteVenue_barId_idx" ON "UserFavoriteVenue"("barId");

-- CreateIndex
CREATE INDEX "UserSavedOffer_offerId_idx" ON "UserSavedOffer"("offerId");

-- AddForeignKey
ALTER TABLE "UserFavoriteVenue" ADD CONSTRAINT "UserFavoriteVenue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteVenue" ADD CONSTRAINT "UserFavoriteVenue_barId_fkey" FOREIGN KEY ("barId") REFERENCES "Bar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSavedOffer" ADD CONSTRAINT "UserSavedOffer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSavedOffer" ADD CONSTRAINT "UserSavedOffer_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
