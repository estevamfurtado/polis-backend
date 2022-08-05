/*
  Warnings:

  - You are about to drop the column `deckId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `albumId` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Sticker` table. All the data in the column will be lost.
  - You are about to drop the `Deck` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[successorId]` on the table `AlbumPage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[successorId]` on the table `Sticker` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_deckId_fkey";

-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_albumId_fkey";

-- AlterTable
ALTER TABLE "AlbumPage" ADD COLUMN     "successorId" INTEGER;

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "deckId",
ADD COLUMN     "albumId" INTEGER,
ADD COLUMN     "ownerId" INTEGER;

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "albumId";

-- AlterTable
ALTER TABLE "Sticker" DROP COLUMN "order",
ADD COLUMN     "successorId" INTEGER;

-- DropTable
DROP TABLE "Deck";

-- CreateTable
CREATE TABLE "UserAlbum" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "albumId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserAlbum_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAlbum_albumId_userId_key" ON "UserAlbum"("albumId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "AlbumPage_successorId_key" ON "AlbumPage"("successorId");

-- CreateIndex
CREATE UNIQUE INDEX "Sticker_successorId_key" ON "Sticker"("successorId");

-- AddForeignKey
ALTER TABLE "AlbumPage" ADD CONSTRAINT "AlbumPage_successorId_fkey" FOREIGN KEY ("successorId") REFERENCES "AlbumPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sticker" ADD CONSTRAINT "Sticker_successorId_fkey" FOREIGN KEY ("successorId") REFERENCES "Sticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "UserAlbum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAlbum" ADD CONSTRAINT "UserAlbum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAlbum" ADD CONSTRAINT "UserAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
