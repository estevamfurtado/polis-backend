/*
  Warnings:

  - You are about to drop the column `organizationAbbreviation` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NewsOpinion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PeriodScore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Source` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Theme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ThemeWeight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ThemesEvaluation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VoteGuidance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Voting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CandidateToNews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NewsToOrganization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NewsToPolitician` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrganizationToView` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PoliticianToView` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[partyAbbreviation]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_partyAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_organizationAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_authorAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "NewsOpinion" DROP CONSTRAINT "NewsOpinion_newsId_fkey";

-- DropForeignKey
ALTER TABLE "NewsOpinion" DROP CONSTRAINT "NewsOpinion_organizationAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "PeriodScore" DROP CONSTRAINT "PeriodScore_politicianId_fkey";

-- DropForeignKey
ALTER TABLE "PeriodScore" DROP CONSTRAINT "PeriodScore_themeId_fkey";

-- DropForeignKey
ALTER TABLE "Politician" DROP CONSTRAINT "Politician_partyAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "Source" DROP CONSTRAINT "Source_newsId_fkey";

-- DropForeignKey
ALTER TABLE "Source" DROP CONSTRAINT "Source_organizationAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "ThemeWeight" DROP CONSTRAINT "ThemeWeight_evaluationId_fkey";

-- DropForeignKey
ALTER TABLE "ThemeWeight" DROP CONSTRAINT "ThemeWeight_themeId_fkey";

-- DropForeignKey
ALTER TABLE "ThemesEvaluation" DROP CONSTRAINT "ThemesEvaluation_organizationAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_politicianId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_votingId_fkey";

-- DropForeignKey
ALTER TABLE "VoteGuidance" DROP CONSTRAINT "VoteGuidance_organizationAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "VoteGuidance" DROP CONSTRAINT "VoteGuidance_votingId_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToNews" DROP CONSTRAINT "_CandidateToNews_A_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToNews" DROP CONSTRAINT "_CandidateToNews_B_fkey";

-- DropForeignKey
ALTER TABLE "_NewsToOrganization" DROP CONSTRAINT "_NewsToOrganization_A_fkey";

-- DropForeignKey
ALTER TABLE "_NewsToOrganization" DROP CONSTRAINT "_NewsToOrganization_B_fkey";

-- DropForeignKey
ALTER TABLE "_NewsToPolitician" DROP CONSTRAINT "_NewsToPolitician_A_fkey";

-- DropForeignKey
ALTER TABLE "_NewsToPolitician" DROP CONSTRAINT "_NewsToPolitician_B_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationToView" DROP CONSTRAINT "_OrganizationToView_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationToView" DROP CONSTRAINT "_OrganizationToView_B_fkey";

-- DropForeignKey
ALTER TABLE "_PoliticianToView" DROP CONSTRAINT "_PoliticianToView_A_fkey";

-- DropForeignKey
ALTER TABLE "_PoliticianToView" DROP CONSTRAINT "_PoliticianToView_B_fkey";

-- DropIndex
DROP INDEX "Candidate_partyAbbreviation_key";

-- DropIndex
DROP INDEX "Contact_organizationAbbreviation_key";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "organizationAbbreviation",
ADD COLUMN     "partyAbbreviation" TEXT;

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "albumId" INTEGER;

-- DropTable
DROP TABLE "News";

-- DropTable
DROP TABLE "NewsOpinion";

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "PeriodScore";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Source";

-- DropTable
DROP TABLE "Theme";

-- DropTable
DROP TABLE "ThemeWeight";

-- DropTable
DROP TABLE "ThemesEvaluation";

-- DropTable
DROP TABLE "Vote";

-- DropTable
DROP TABLE "VoteGuidance";

-- DropTable
DROP TABLE "Voting";

-- DropTable
DROP TABLE "_CandidateToNews";

-- DropTable
DROP TABLE "_NewsToOrganization";

-- DropTable
DROP TABLE "_NewsToPolitician";

-- DropTable
DROP TABLE "_OrganizationToView";

-- DropTable
DROP TABLE "_PoliticianToView";

-- CreateTable
CREATE TABLE "PoliticalParty" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "abbreviation" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "mainColor" TEXT,
    "secondaryColor" TEXT,
    "about" TEXT,

    CONSTRAINT "PoliticalParty_pkey" PRIMARY KEY ("abbreviation")
);

-- CreateTable
CREATE TABLE "Ranking" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

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

    CONSTRAINT "RankingRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverUrl" TEXT NOT NULL,
    "thumbUrl" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlbumPage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "backgroundColor" TEXT,
    "albumId" INTEGER NOT NULL,

    CONSTRAINT "AlbumPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sticker" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pageId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "identifier" TEXT NOT NULL,

    CONSTRAINT "Sticker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardModel" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recordId" INTEGER,
    "variant" TEXT NOT NULL DEFAULT E'normal',
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "CardModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modelId" INTEGER NOT NULL,
    "isPasted" BOOLEAN NOT NULL DEFAULT false,
    "amount" INTEGER NOT NULL DEFAULT 1,
    "deckId" INTEGER,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" INTEGER NOT NULL,
    "albumId" INTEGER NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PoliticalPartyToView" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PoliticalParty_cnpj_key" ON "PoliticalParty"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "PoliticalParty_abbreviation_key" ON "PoliticalParty"("abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "Sticker_identifier_key" ON "Sticker"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "CardModel_recordId_key" ON "CardModel"("recordId");

-- CreateIndex
CREATE UNIQUE INDEX "_PoliticalPartyToView_AB_unique" ON "_PoliticalPartyToView"("A", "B");

-- CreateIndex
CREATE INDEX "_PoliticalPartyToView_B_index" ON "_PoliticalPartyToView"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_partyAbbreviation_key" ON "Contact"("partyAbbreviation");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_partyAbbreviation_fkey" FOREIGN KEY ("partyAbbreviation") REFERENCES "PoliticalParty"("abbreviation") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_partyAbbreviation_fkey" FOREIGN KEY ("partyAbbreviation") REFERENCES "PoliticalParty"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Politician" ADD CONSTRAINT "Politician_partyAbbreviation_fkey" FOREIGN KEY ("partyAbbreviation") REFERENCES "PoliticalParty"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingRecord" ADD CONSTRAINT "RankingRecord_stateAbbreviation_fkey" FOREIGN KEY ("stateAbbreviation") REFERENCES "State"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingRecord" ADD CONSTRAINT "RankingRecord_partyAbbreviation_fkey" FOREIGN KEY ("partyAbbreviation") REFERENCES "PoliticalParty"("abbreviation") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingRecord" ADD CONSTRAINT "RankingRecord_politicianId_fkey" FOREIGN KEY ("politicianId") REFERENCES "Politician"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RankingRecord" ADD CONSTRAINT "RankingRecord_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "Ranking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumPage" ADD CONSTRAINT "AlbumPage_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sticker" ADD CONSTRAINT "Sticker_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "AlbumPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sticker" ADD CONSTRAINT "Sticker_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CardModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardModel" ADD CONSTRAINT "CardModel_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "RankingRecord"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "CardModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PoliticalPartyToView" ADD CONSTRAINT "_PoliticalPartyToView_A_fkey" FOREIGN KEY ("A") REFERENCES "PoliticalParty"("abbreviation") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PoliticalPartyToView" ADD CONSTRAINT "_PoliticalPartyToView_B_fkey" FOREIGN KEY ("B") REFERENCES "View"("id") ON DELETE CASCADE ON UPDATE CASCADE;
