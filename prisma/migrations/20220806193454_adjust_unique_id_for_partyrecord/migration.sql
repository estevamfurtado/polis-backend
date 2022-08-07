/*
  Warnings:

  - You are about to drop the column `rankingId` on the `PartyRecord` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rankingYear,partyAbbreviation]` on the table `PartyRecord` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rankingYear` to the `PartyRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PartyRecord" DROP CONSTRAINT "PartyRecord_rankingId_fkey";

-- DropIndex
DROP INDEX "PartyRecord_rankingId_partyAbbreviation_key";

-- AlterTable
ALTER TABLE "PartyRecord" DROP COLUMN "rankingId",
ADD COLUMN     "rankingYear" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PartyRecord_rankingYear_partyAbbreviation_key" ON "PartyRecord"("rankingYear", "partyAbbreviation");

-- AddForeignKey
ALTER TABLE "PartyRecord" ADD CONSTRAINT "PartyRecord_rankingYear_fkey" FOREIGN KEY ("rankingYear") REFERENCES "Ranking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
