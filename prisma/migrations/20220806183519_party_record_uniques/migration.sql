/*
  Warnings:

  - You are about to drop the column `partyId` on the `PartyRecord` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rankingId,partyAbbreviation]` on the table `PartyRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PartyRecord_rankingId_partyId_key";

-- AlterTable
ALTER TABLE "PartyRecord" DROP COLUMN "partyId";

-- CreateIndex
CREATE UNIQUE INDEX "PartyRecord_rankingId_partyAbbreviation_key" ON "PartyRecord"("rankingId", "partyAbbreviation");
