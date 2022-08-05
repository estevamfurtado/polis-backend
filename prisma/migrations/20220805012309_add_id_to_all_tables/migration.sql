/*
  Warnings:

  - You are about to drop the `PoliticianInRanking` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `PoliticalParty` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `State` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CardModel" DROP CONSTRAINT "CardModel_recordId_fkey";

-- DropForeignKey
ALTER TABLE "PoliticianInRanking" DROP CONSTRAINT "PoliticianInRanking_partyAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "PoliticianInRanking" DROP CONSTRAINT "PoliticianInRanking_politicianId_fkey";

-- DropForeignKey
ALTER TABLE "PoliticianInRanking" DROP CONSTRAINT "PoliticianInRanking_rankingId_fkey";

-- DropForeignKey
ALTER TABLE "PoliticianInRanking" DROP CONSTRAINT "PoliticianInRanking_stateAbbreviation_fkey";

-- AlterTable
ALTER TABLE "PoliticalParty" ADD COLUMN     "id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "State" ADD COLUMN     "id" SERIAL NOT NULL;

-- DropTable
DROP TABLE "PoliticianInRanking";

-- CreateTable
CREATE TABLE "RankingRecord" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "politicianId" INTEGER,
    "sourceId" TEXT,
    "sourceUrl" TEXT,
    "sourceName" TEXT,
    "rankingId" INTEGER NOT NULL,
    "partyAbbreviation" TEXT,
    "stateAbbreviation" TEXT,
    "candidateType" TEXT,
    "quantityVote" INTEGER,
    "reelected" BOOLEAN,
    "cutAidShift" BOOLEAN,
    "isPresident" BOOLEAN,
    "cutHousingAllowance" BOOLEAN,
    "cutRetirement" BOOLEAN,
    "requestedFamilyPassport" BOOLEAN,
    "quotaAmountSum" INTEGER,
    "scorePresence" DOUBLE PRECISION,
    "scoreSaveQuota" DOUBLE PRECISION,
    "scoreProcess" DOUBLE PRECISION,
    "scoreInternal" DOUBLE PRECISION,
    "scorePrivileges" DOUBLE PRECISION,
    "scoreWastage" DOUBLE PRECISION,
    "scoreTotal" DOUBLE PRECISION,
    "scoreRanking" INTEGER,
    "scoreRankingByPosition" INTEGER,
    "scoreRankingByParty" INTEGER,
    "scoreRankingByState" INTEGER,
    "scorePresenceFormula" TEXT,
    "scoreProcessFormula" TEXT,
    "scorePrivilegesFormula" TEXT,
    "scoreSaveQuotaFormula" TEXT,
    "scoreWastageFormula" TEXT,
    "scoreTotalFormula" TEXT,
    "parliamentarianCount" INTEGER,
    "parliamentarianStateCount" INTEGER,
    "parliamentarianStaffMaxYear" DOUBLE PRECISION,
    "parliamentarianQuotaMaxYear" DOUBLE PRECISION,

    CONSTRAINT "RankingRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RankingRecord_rankingId_politicianId_key" ON "RankingRecord"("rankingId", "politicianId");

-- CreateIndex
CREATE UNIQUE INDEX "PoliticalParty_id_key" ON "PoliticalParty"("id");

-- CreateIndex
CREATE UNIQUE INDEX "State_id_key" ON "State"("id");

-- AddForeignKey
ALTER TABLE "RankingRecord" ADD CONSTRAINT "RankingRecord_stateAbbreviation_fkey" FOREIGN KEY ("stateAbbreviation") REFERENCES "State"("abbreviation") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingRecord" ADD CONSTRAINT "RankingRecord_partyAbbreviation_fkey" FOREIGN KEY ("partyAbbreviation") REFERENCES "PoliticalParty"("abbreviation") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingRecord" ADD CONSTRAINT "RankingRecord_politicianId_fkey" FOREIGN KEY ("politicianId") REFERENCES "Politician"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingRecord" ADD CONSTRAINT "RankingRecord_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "Ranking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardModel" ADD CONSTRAINT "CardModel_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "RankingRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;
