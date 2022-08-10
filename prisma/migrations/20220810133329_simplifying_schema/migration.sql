/*
  Warnings:

  - You are about to drop the column `entryPageId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `modelId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `entryStickerId` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `successorId` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `cardId` on the `Sticker` table. All the data in the column will be lost.
  - You are about to drop the column `successorId` on the `Sticker` table. All the data in the column will be lost.
  - You are about to drop the `Candidate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CandidateShortVideo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CardModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PartyScore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reaction` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[stickerId]` on the table `Record` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[politicianRecordId]` on the table `Sticker` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[partyRecordId]` on the table `Sticker` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stickerId` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderInAlbum` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Sticker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderInPage` to the `Sticker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Sticker` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StickerAvailabilityTypes" AS ENUM ('easy', 'medium', 'rare');

-- CreateEnum
CREATE TYPE "StickerTypes" AS ENUM ('party', 'politician', 'moment');

-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_entryPageId_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_partyAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_personId_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_stateAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "CandidateShortVideo" DROP CONSTRAINT "CandidateShortVideo_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_modelId_fkey";

-- DropForeignKey
ALTER TABLE "CardModel" DROP CONSTRAINT "CardModel_recordId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_partyAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_personId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_entryStickerId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_successorId_fkey";

-- DropForeignKey
ALTER TABLE "PartyScore" DROP CONSTRAINT "PartyScore_partyRecordId_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_personId_fkey";

-- DropForeignKey
ALTER TABLE "Sticker" DROP CONSTRAINT "Sticker_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Sticker" DROP CONSTRAINT "Sticker_successorId_fkey";

-- DropIndex
DROP INDEX "Album_entryPageId_key";

-- DropIndex
DROP INDEX "Page_entryStickerId_key";

-- DropIndex
DROP INDEX "Page_successorId_key";

-- DropIndex
DROP INDEX "Sticker_successorId_key";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "entryPageId";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "modelId",
ADD COLUMN     "isNew" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stickerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "entryStickerId",
DROP COLUMN "successorId",
ADD COLUMN     "orderInAlbum" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PartyRecord" ADD COLUMN     "scoreInternal" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "scoreInternalCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scoreInternalSum" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "scorePresence" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "scorePresenceCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scorePresenceSum" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "scorePrivileges" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "scorePrivilegesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scorePrivilegesSum" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "scoreProcess" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "scoreProcessCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scoreProcessSum" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "scoreSaveQuota" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "scoreSaveQuotaCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scoreSaveQuotaSum" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "scoreTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "scoreTotalCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scoreTotalSum" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "scoreWastage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "scoreWastageCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scoreWastageSum" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "stickerId" INTEGER;

-- AlterTable
ALTER TABLE "Sticker" DROP COLUMN "cardId",
DROP COLUMN "successorId",
ADD COLUMN     "availability" "StickerAvailabilityTypes" NOT NULL DEFAULT E'easy',
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "orderInPage" INTEGER NOT NULL,
ADD COLUMN     "partyRecordId" INTEGER,
ADD COLUMN     "politicianRecordId" INTEGER,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" "StickerTypes" NOT NULL DEFAULT E'politician';

-- DropTable
DROP TABLE "Candidate";

-- DropTable
DROP TABLE "CandidateShortVideo";

-- DropTable
DROP TABLE "CardModel";

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "PartyScore";

-- DropTable
DROP TABLE "Reaction";

-- CreateIndex
CREATE UNIQUE INDEX "Record_stickerId_key" ON "Record"("stickerId");

-- CreateIndex
CREATE UNIQUE INDEX "Sticker_politicianRecordId_key" ON "Sticker"("politicianRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "Sticker_partyRecordId_key" ON "Sticker"("partyRecordId");

-- AddForeignKey
ALTER TABLE "Sticker" ADD CONSTRAINT "Sticker_politicianRecordId_fkey" FOREIGN KEY ("politicianRecordId") REFERENCES "Record"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sticker" ADD CONSTRAINT "Sticker_partyRecordId_fkey" FOREIGN KEY ("partyRecordId") REFERENCES "PartyRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_stickerId_fkey" FOREIGN KEY ("stickerId") REFERENCES "Sticker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
