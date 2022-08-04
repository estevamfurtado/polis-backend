/*
  Warnings:

  - You are about to alter the column `scoreRanking` on the `PoliticianInRanking` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `scoreRankingByPosition` on the `PoliticianInRanking` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `scoreRankingByParty` on the `PoliticianInRanking` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `scoreRankingByState` on the `PoliticianInRanking` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Changed the type of `parliamentarianCount` on the `PoliticianInRanking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `parliamentarianStateCount` on the `PoliticianInRanking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `parliamentarianStaffMaxYear` on the `PoliticianInRanking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `parliamentarianQuotaMaxYear` on the `PoliticianInRanking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PoliticianInRanking" ALTER COLUMN "scoreRanking" SET DATA TYPE INTEGER,
ALTER COLUMN "scoreRankingByPosition" SET DATA TYPE INTEGER,
ALTER COLUMN "scoreRankingByParty" SET DATA TYPE INTEGER,
ALTER COLUMN "scoreRankingByState" SET DATA TYPE INTEGER,
DROP COLUMN "parliamentarianCount",
ADD COLUMN     "parliamentarianCount" INTEGER NOT NULL,
DROP COLUMN "parliamentarianStateCount",
ADD COLUMN     "parliamentarianStateCount" INTEGER NOT NULL,
DROP COLUMN "parliamentarianStaffMaxYear",
ADD COLUMN     "parliamentarianStaffMaxYear" INTEGER NOT NULL,
DROP COLUMN "parliamentarianQuotaMaxYear",
ADD COLUMN     "parliamentarianQuotaMaxYear" INTEGER NOT NULL;
