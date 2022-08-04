/*
  Warnings:

  - The primary key for the `Candidate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `partyId` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `stateId` on the `Candidate` table. All the data in the column will be lost.
  - The `id` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Contact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `organizationId` on the `Contact` table. All the data in the column will be lost.
  - The `id` column on the `Contact` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `News` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdById` on the `News` table. All the data in the column will be lost.
  - The `id` column on the `News` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `NewsOpinion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `organizationId` on the `NewsOpinion` table. All the data in the column will be lost.
  - The `id` column on the `NewsOpinion` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Organization` table. All the data in the column will be lost.
  - The primary key for the `PeriodScore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PeriodScore` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `voteStateId` on the `Person` table. All the data in the column will be lost.
  - The `id` column on the `Person` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Politician` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `partyId` on the `Politician` table. All the data in the column will be lost.
  - You are about to drop the column `stateId` on the `Politician` table. All the data in the column will be lost.
  - The `id` column on the `Politician` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `mandateId` on the `Role` table. All the data in the column will be lost.
  - The `id` column on the `Role` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Sentiment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Sentiment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Source` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `organizationId` on the `Source` table. All the data in the column will be lost.
  - The `id` column on the `Source` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `newsId` column on the `Source` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `State` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `State` table. All the data in the column will be lost.
  - The primary key for the `Theme` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Theme` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ThemeWeight` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ThemeWeight` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ThemesEvaluation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `organizationId` on the `ThemesEvaluation` table. All the data in the column will be lost.
  - The `id` column on the `ThemesEvaluation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `View` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `economics` on the `View` table. All the data in the column will be lost.
  - You are about to drop the column `freedom` on the `View` table. All the data in the column will be lost.
  - You are about to drop the column `social` on the `View` table. All the data in the column will be lost.
  - The `id` column on the `View` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Vote` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `VoteGuidance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `organizationId` on the `VoteGuidance` table. All the data in the column will be lost.
  - The `id` column on the `VoteGuidance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Voting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Voting` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Mandate` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[partyAbbreviation]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationAbbreviation]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorAbbreviation]` on the table `News` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organizationAbbreviation]` on the table `NewsOpinion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[abbreviation]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stateAbbreviation]` on the table `Politician` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[abbreviation]` on the table `State` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `partyAbbreviation` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateAbbreviation` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `personId` on the `Candidate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `organizationAbbreviation` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `personId` on the `Contact` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `authorAbbreviation` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationAbbreviation` to the `NewsOpinion` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `newsId` on the `NewsOpinion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `abbreviation` on table `Organization` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `politicianId` on the `PeriodScore` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `themeId` on the `PeriodScore` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `voteStateAbbreviation` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partyAbbreviation` to the `Politician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateAbbreviation` to the `Politician` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `personId` on the `Politician` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `personId` on the `Sentiment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `candidateId` on the `Sentiment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `organizationAbbreviation` to the `Source` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `evaluationId` on the `ThemeWeight` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `themeId` on the `ThemeWeight` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `organizationAbbreviation` to the `ThemesEvaluation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `votingId` on the `Vote` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `politicianId` on the `Vote` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `organizationAbbreviation` to the `VoteGuidance` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `votingId` on the `VoteGuidance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_CandidateToNews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_CandidateToNews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_CandidateToView` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_CandidateToView` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_NewsToOrganization` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_NewsToPolitician` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_NewsToPolitician` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_OrganizationToView` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_PersonToView` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_PersonToView` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_PoliticianToView` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_PoliticianToView` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_partyId_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_personId_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_stateId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_personId_fkey";

-- DropForeignKey
ALTER TABLE "Mandate" DROP CONSTRAINT "Mandate_politicianId_fkey";

-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_createdById_fkey";

-- DropForeignKey
ALTER TABLE "NewsOpinion" DROP CONSTRAINT "NewsOpinion_newsId_fkey";

-- DropForeignKey
ALTER TABLE "NewsOpinion" DROP CONSTRAINT "NewsOpinion_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "PeriodScore" DROP CONSTRAINT "PeriodScore_politicianId_fkey";

-- DropForeignKey
ALTER TABLE "PeriodScore" DROP CONSTRAINT "PeriodScore_themeId_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_voteStateId_fkey";

-- DropForeignKey
ALTER TABLE "Politician" DROP CONSTRAINT "Politician_partyId_fkey";

-- DropForeignKey
ALTER TABLE "Politician" DROP CONSTRAINT "Politician_personId_fkey";

-- DropForeignKey
ALTER TABLE "Politician" DROP CONSTRAINT "Politician_stateId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_mandateId_fkey";

-- DropForeignKey
ALTER TABLE "Sentiment" DROP CONSTRAINT "Sentiment_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Sentiment" DROP CONSTRAINT "Sentiment_personId_fkey";

-- DropForeignKey
ALTER TABLE "Source" DROP CONSTRAINT "Source_newsId_fkey";

-- DropForeignKey
ALTER TABLE "Source" DROP CONSTRAINT "Source_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "ThemeWeight" DROP CONSTRAINT "ThemeWeight_evaluationId_fkey";

-- DropForeignKey
ALTER TABLE "ThemeWeight" DROP CONSTRAINT "ThemeWeight_themeId_fkey";

-- DropForeignKey
ALTER TABLE "ThemesEvaluation" DROP CONSTRAINT "ThemesEvaluation_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_politicianId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_votingId_fkey";

-- DropForeignKey
ALTER TABLE "VoteGuidance" DROP CONSTRAINT "VoteGuidance_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "VoteGuidance" DROP CONSTRAINT "VoteGuidance_votingId_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToNews" DROP CONSTRAINT "_CandidateToNews_A_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToNews" DROP CONSTRAINT "_CandidateToNews_B_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToView" DROP CONSTRAINT "_CandidateToView_A_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToView" DROP CONSTRAINT "_CandidateToView_B_fkey";

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
ALTER TABLE "_PersonToView" DROP CONSTRAINT "_PersonToView_A_fkey";

-- DropForeignKey
ALTER TABLE "_PersonToView" DROP CONSTRAINT "_PersonToView_B_fkey";

-- DropForeignKey
ALTER TABLE "_PoliticianToView" DROP CONSTRAINT "_PoliticianToView_A_fkey";

-- DropForeignKey
ALTER TABLE "_PoliticianToView" DROP CONSTRAINT "_PoliticianToView_B_fkey";

-- DropIndex
DROP INDEX "Candidate_partyId_key";

-- DropIndex
DROP INDEX "Candidate_stateId_key";

-- DropIndex
DROP INDEX "Contact_organizationId_key";

-- DropIndex
DROP INDEX "News_createdById_key";

-- DropIndex
DROP INDEX "NewsOpinion_organizationId_key";

-- DropIndex
DROP INDEX "Politician_partyId_key";

-- DropIndex
DROP INDEX "Politician_stateId_key";

-- DropIndex
DROP INDEX "Role_mandateId_key";

-- DropIndex
DROP INDEX "Source_organizationId_key";

-- DropIndex
DROP INDEX "VoteGuidance_organizationId_key";

-- AlterTable
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_pkey",
DROP COLUMN "partyId",
DROP COLUMN "stateId",
ADD COLUMN     "partyAbbreviation" TEXT NOT NULL,
ADD COLUMN     "stateAbbreviation" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "personId",
ADD COLUMN     "personId" INTEGER NOT NULL,
ADD CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_pkey",
DROP COLUMN "organizationId",
ADD COLUMN     "organizationAbbreviation" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "personId",
ADD COLUMN     "personId" INTEGER NOT NULL,
ADD CONSTRAINT "Contact_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "News" DROP CONSTRAINT "News_pkey",
DROP COLUMN "createdById",
ADD COLUMN     "authorAbbreviation" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "News_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "NewsOpinion" DROP CONSTRAINT "NewsOpinion_pkey",
DROP COLUMN "organizationId",
ADD COLUMN     "organizationAbbreviation" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "newsId",
ADD COLUMN     "newsId" INTEGER NOT NULL,
ADD CONSTRAINT "NewsOpinion_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_pkey",
DROP COLUMN "id",
ALTER COLUMN "abbreviation" SET NOT NULL,
ADD CONSTRAINT "Organization_pkey" PRIMARY KEY ("abbreviation");

-- AlterTable
ALTER TABLE "PeriodScore" DROP CONSTRAINT "PeriodScore_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "politicianId",
ADD COLUMN     "politicianId" INTEGER NOT NULL,
DROP COLUMN "themeId",
ADD COLUMN     "themeId" INTEGER NOT NULL,
ADD CONSTRAINT "PeriodScore_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Person" DROP CONSTRAINT "Person_pkey",
DROP COLUMN "voteStateId",
ADD COLUMN     "voteStateAbbreviation" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ADD CONSTRAINT "Person_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Politician" DROP CONSTRAINT "Politician_pkey",
DROP COLUMN "partyId",
DROP COLUMN "stateId",
ADD COLUMN     "partyAbbreviation" TEXT NOT NULL,
ADD COLUMN     "stateAbbreviation" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "personId",
ADD COLUMN     "personId" INTEGER NOT NULL,
ADD CONSTRAINT "Politician_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "mandateId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Sentiment" DROP CONSTRAINT "Sentiment_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "personId",
ADD COLUMN     "personId" INTEGER NOT NULL,
DROP COLUMN "candidateId",
ADD COLUMN     "candidateId" INTEGER NOT NULL,
ADD CONSTRAINT "Sentiment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Source" DROP CONSTRAINT "Source_pkey",
DROP COLUMN "organizationId",
ADD COLUMN     "organizationAbbreviation" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "newsId",
ADD COLUMN     "newsId" INTEGER,
ADD CONSTRAINT "Source_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "State" DROP CONSTRAINT "State_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "State_pkey" PRIMARY KEY ("abbreviation");

-- AlterTable
ALTER TABLE "Theme" DROP CONSTRAINT "Theme_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Theme_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ThemeWeight" DROP CONSTRAINT "ThemeWeight_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "evaluationId",
ADD COLUMN     "evaluationId" INTEGER NOT NULL,
DROP COLUMN "themeId",
ADD COLUMN     "themeId" INTEGER NOT NULL,
ADD CONSTRAINT "ThemeWeight_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ThemesEvaluation" DROP CONSTRAINT "ThemesEvaluation_pkey",
DROP COLUMN "organizationId",
ADD COLUMN     "organizationAbbreviation" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ThemesEvaluation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "View" DROP CONSTRAINT "View_pkey",
DROP COLUMN "economics",
DROP COLUMN "freedom",
DROP COLUMN "social",
ADD COLUMN     "economicFreedom" INTEGER,
ADD COLUMN     "personalFreedom" INTEGER,
ADD COLUMN     "politicalFreedom" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "View_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "votingId",
ADD COLUMN     "votingId" INTEGER NOT NULL,
DROP COLUMN "politicianId",
ADD COLUMN     "politicianId" INTEGER NOT NULL,
ADD CONSTRAINT "Vote_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "VoteGuidance" DROP CONSTRAINT "VoteGuidance_pkey",
DROP COLUMN "organizationId",
ADD COLUMN     "organizationAbbreviation" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "votingId",
ADD COLUMN     "votingId" INTEGER NOT NULL,
ADD CONSTRAINT "VoteGuidance_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Voting" DROP CONSTRAINT "Voting_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Voting_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_CandidateToNews" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_CandidateToView" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_NewsToOrganization" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_NewsToPolitician" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_OrganizationToView" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_PersonToView" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_PoliticianToView" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Mandate";

-- DropEnum
DROP TYPE "MandateOptions";

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_personId_key" ON "Candidate"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_partyAbbreviation_key" ON "Candidate"("partyAbbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_personId_key" ON "Contact"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_organizationAbbreviation_key" ON "Contact"("organizationAbbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "News_authorAbbreviation_key" ON "News"("authorAbbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "NewsOpinion_newsId_key" ON "NewsOpinion"("newsId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsOpinion_organizationAbbreviation_key" ON "NewsOpinion"("organizationAbbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_abbreviation_key" ON "Organization"("abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "Politician_personId_key" ON "Politician"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Politician_stateAbbreviation_key" ON "Politician"("stateAbbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "Sentiment_personId_key" ON "Sentiment"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Sentiment_candidateId_key" ON "Sentiment"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "State_abbreviation_key" ON "State"("abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_votingId_key" ON "Vote"("votingId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_politicianId_key" ON "Vote"("politicianId");

-- CreateIndex
CREATE UNIQUE INDEX "VoteGuidance_votingId_key" ON "VoteGuidance"("votingId");

-- CreateIndex
CREATE UNIQUE INDEX "_CandidateToNews_AB_unique" ON "_CandidateToNews"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidateToNews_B_index" ON "_CandidateToNews"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CandidateToView_AB_unique" ON "_CandidateToView"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidateToView_B_index" ON "_CandidateToView"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NewsToOrganization_AB_unique" ON "_NewsToOrganization"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_NewsToPolitician_AB_unique" ON "_NewsToPolitician"("A", "B");

-- CreateIndex
CREATE INDEX "_NewsToPolitician_B_index" ON "_NewsToPolitician"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToView_AB_unique" ON "_OrganizationToView"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToView_B_index" ON "_OrganizationToView"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PersonToView_AB_unique" ON "_PersonToView"("A", "B");

-- CreateIndex
CREATE INDEX "_PersonToView_B_index" ON "_PersonToView"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PoliticianToView_AB_unique" ON "_PoliticianToView"("A", "B");

-- CreateIndex
CREATE INDEX "_PoliticianToView_B_index" ON "_PoliticianToView"("B");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_voteStateAbbreviation_fkey" FOREIGN KEY ("voteStateAbbreviation") REFERENCES "State"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThemesEvaluation" ADD CONSTRAINT "ThemesEvaluation_organizationAbbreviation_fkey" FOREIGN KEY ("organizationAbbreviation") REFERENCES "Organization"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThemeWeight" ADD CONSTRAINT "ThemeWeight_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "ThemesEvaluation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThemeWeight" ADD CONSTRAINT "ThemeWeight_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_organizationAbbreviation_fkey" FOREIGN KEY ("organizationAbbreviation") REFERENCES "Organization"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_stateAbbreviation_fkey" FOREIGN KEY ("stateAbbreviation") REFERENCES "State"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_partyAbbreviation_fkey" FOREIGN KEY ("partyAbbreviation") REFERENCES "Organization"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Politician" ADD CONSTRAINT "Politician_stateAbbreviation_fkey" FOREIGN KEY ("stateAbbreviation") REFERENCES "State"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Politician" ADD CONSTRAINT "Politician_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Politician" ADD CONSTRAINT "Politician_partyAbbreviation_fkey" FOREIGN KEY ("partyAbbreviation") REFERENCES "Organization"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeriodScore" ADD CONSTRAINT "PeriodScore_politicianId_fkey" FOREIGN KEY ("politicianId") REFERENCES "Politician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeriodScore" ADD CONSTRAINT "PeriodScore_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sentiment" ADD CONSTRAINT "Sentiment_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sentiment" ADD CONSTRAINT "Sentiment_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_politicianId_fkey" FOREIGN KEY ("politicianId") REFERENCES "Politician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_votingId_fkey" FOREIGN KEY ("votingId") REFERENCES "Voting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteGuidance" ADD CONSTRAINT "VoteGuidance_organizationAbbreviation_fkey" FOREIGN KEY ("organizationAbbreviation") REFERENCES "Organization"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteGuidance" ADD CONSTRAINT "VoteGuidance_votingId_fkey" FOREIGN KEY ("votingId") REFERENCES "Voting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_authorAbbreviation_fkey" FOREIGN KEY ("authorAbbreviation") REFERENCES "Organization"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_organizationAbbreviation_fkey" FOREIGN KEY ("organizationAbbreviation") REFERENCES "Organization"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsOpinion" ADD CONSTRAINT "NewsOpinion_organizationAbbreviation_fkey" FOREIGN KEY ("organizationAbbreviation") REFERENCES "Organization"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsOpinion" ADD CONSTRAINT "NewsOpinion_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonToView" ADD CONSTRAINT "_PersonToView_A_fkey" FOREIGN KEY ("A") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonToView" ADD CONSTRAINT "_PersonToView_B_fkey" FOREIGN KEY ("B") REFERENCES "View"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToView" ADD CONSTRAINT "_OrganizationToView_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("abbreviation") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToView" ADD CONSTRAINT "_OrganizationToView_B_fkey" FOREIGN KEY ("B") REFERENCES "View"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToView" ADD CONSTRAINT "_CandidateToView_A_fkey" FOREIGN KEY ("A") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToView" ADD CONSTRAINT "_CandidateToView_B_fkey" FOREIGN KEY ("B") REFERENCES "View"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToNews" ADD CONSTRAINT "_CandidateToNews_A_fkey" FOREIGN KEY ("A") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToNews" ADD CONSTRAINT "_CandidateToNews_B_fkey" FOREIGN KEY ("B") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PoliticianToView" ADD CONSTRAINT "_PoliticianToView_A_fkey" FOREIGN KEY ("A") REFERENCES "Politician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PoliticianToView" ADD CONSTRAINT "_PoliticianToView_B_fkey" FOREIGN KEY ("B") REFERENCES "View"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsToPolitician" ADD CONSTRAINT "_NewsToPolitician_A_fkey" FOREIGN KEY ("A") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsToPolitician" ADD CONSTRAINT "_NewsToPolitician_B_fkey" FOREIGN KEY ("B") REFERENCES "Politician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsToOrganization" ADD CONSTRAINT "_NewsToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsToOrganization" ADD CONSTRAINT "_NewsToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization"("abbreviation") ON DELETE CASCADE ON UPDATE CASCADE;
