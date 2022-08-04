/*
  Warnings:

  - You are about to drop the `Sentiment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `View` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CandidateToView` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PersonToView` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PoliticalPartyToView` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ReactionTypes" AS ENUM ('like', 'dislike');

-- DropForeignKey
ALTER TABLE "Sentiment" DROP CONSTRAINT "Sentiment_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "Sentiment" DROP CONSTRAINT "Sentiment_personId_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToView" DROP CONSTRAINT "_CandidateToView_A_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToView" DROP CONSTRAINT "_CandidateToView_B_fkey";

-- DropForeignKey
ALTER TABLE "_PersonToView" DROP CONSTRAINT "_PersonToView_A_fkey";

-- DropForeignKey
ALTER TABLE "_PersonToView" DROP CONSTRAINT "_PersonToView_B_fkey";

-- DropForeignKey
ALTER TABLE "_PoliticalPartyToView" DROP CONSTRAINT "_PoliticalPartyToView_A_fkey";

-- DropForeignKey
ALTER TABLE "_PoliticalPartyToView" DROP CONSTRAINT "_PoliticalPartyToView_B_fkey";

-- DropTable
DROP TABLE "Sentiment";

-- DropTable
DROP TABLE "View";

-- DropTable
DROP TABLE "_CandidateToView";

-- DropTable
DROP TABLE "_PersonToView";

-- DropTable
DROP TABLE "_PoliticalPartyToView";

-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "ReactionTypes" NOT NULL,
    "personId" INTEGER NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_personId_key" ON "Reaction"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_candidateId_key" ON "Reaction"("candidateId");

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
