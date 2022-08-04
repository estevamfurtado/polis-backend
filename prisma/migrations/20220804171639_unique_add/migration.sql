/*
  Warnings:

  - You are about to drop the `RankingRecord` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[year,title]` on the table `Album` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[albumId,title]` on the table `AlbumPage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerId,albumId]` on the table `Deck` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[year,title]` on the table `Ranking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pageId,identifier]` on the table `Sticker` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `year` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CardModel" DROP CONSTRAINT "CardModel_recordId_fkey";

-- DropForeignKey
ALTER TABLE "RankingRecord" DROP CONSTRAINT "RankingRecord_partyAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "RankingRecord" DROP CONSTRAINT "RankingRecord_politicianId_fkey";

-- DropForeignKey
ALTER TABLE "RankingRecord" DROP CONSTRAINT "RankingRecord_rankingId_fkey";

-- DropForeignKey
ALTER TABLE "RankingRecord" DROP CONSTRAINT "RankingRecord_stateAbbreviation_fkey";

-- DropIndex
DROP INDEX "Sticker_identifier_key";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "year" INTEGER NOT NULL;

-- DropTable
DROP TABLE "RankingRecord";

-- CreateTable
CREATE TABLE "PoliticianInRanking" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "politicianId" INTEGER,
    "sourceId" TEXT,
    "sourceUrl" TEXT,
    "sourceName" TEXT,
    "rankingId" INTEGER NOT NULL,
    "partyAbbreviation" TEXT,
    "stateAbbreviation" TEXT NOT NULL,
    "candidateType" TEXT NOT NULL,
    "quantityVote" INTEGER NOT NULL,
    "reelected" BOOLEAN NOT NULL,
    "cutAidShift" BOOLEAN NOT NULL,
    "isPresident" BOOLEAN NOT NULL,
    "cutHousingAllowance" BOOLEAN NOT NULL,
    "cutRetirement" BOOLEAN NOT NULL,
    "requestedFamilyPassport" BOOLEAN NOT NULL,
    "quotaAmountSum" INTEGER NOT NULL,
    "scorePresence" DOUBLE PRECISION NOT NULL,
    "scoreSaveQuota" DOUBLE PRECISION NOT NULL,
    "scoreProcess" DOUBLE PRECISION NOT NULL,
    "scoreInternal" DOUBLE PRECISION NOT NULL,
    "scorePrivileges" DOUBLE PRECISION NOT NULL,
    "scoreWastage" DOUBLE PRECISION NOT NULL,
    "scoreTotal" DOUBLE PRECISION NOT NULL,
    "scoreRanking" DOUBLE PRECISION NOT NULL,
    "scoreRankingByPosition" DOUBLE PRECISION NOT NULL,
    "scoreRankingByParty" DOUBLE PRECISION NOT NULL,
    "scoreRankingByState" DOUBLE PRECISION NOT NULL,
    "scorePresenceFormula" TEXT NOT NULL,
    "scoreProcessFormula" TEXT NOT NULL,
    "scorePrivilegesFormula" TEXT NOT NULL,
    "scoreSaveQuotaFormula" TEXT NOT NULL,
    "scoreWastageFormula" TEXT NOT NULL,
    "scoreTotalFormula" TEXT NOT NULL,
    "parliamentarianCount" TEXT NOT NULL,
    "parliamentarianStateCount" TEXT NOT NULL,
    "parliamentarianStaffMaxYear" TEXT NOT NULL,
    "parliamentarianQuotaMaxYear" TEXT NOT NULL,

    CONSTRAINT "PoliticianInRanking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PoliticianInRanking_rankingId_politicianId_key" ON "PoliticianInRanking"("rankingId", "politicianId");

-- CreateIndex
CREATE UNIQUE INDEX "Album_year_title_key" ON "Album"("year", "title");

-- CreateIndex
CREATE UNIQUE INDEX "AlbumPage_albumId_title_key" ON "AlbumPage"("albumId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Deck_ownerId_albumId_key" ON "Deck"("ownerId", "albumId");

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_year_title_key" ON "Ranking"("year", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Sticker_pageId_identifier_key" ON "Sticker"("pageId", "identifier");

-- AddForeignKey
ALTER TABLE "PoliticianInRanking" ADD CONSTRAINT "PoliticianInRanking_stateAbbreviation_fkey" FOREIGN KEY ("stateAbbreviation") REFERENCES "State"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoliticianInRanking" ADD CONSTRAINT "PoliticianInRanking_partyAbbreviation_fkey" FOREIGN KEY ("partyAbbreviation") REFERENCES "PoliticalParty"("abbreviation") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoliticianInRanking" ADD CONSTRAINT "PoliticianInRanking_politicianId_fkey" FOREIGN KEY ("politicianId") REFERENCES "Politician"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoliticianInRanking" ADD CONSTRAINT "PoliticianInRanking_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "Ranking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardModel" ADD CONSTRAINT "CardModel_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "PoliticianInRanking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
