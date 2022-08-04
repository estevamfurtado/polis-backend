-- DropForeignKey
ALTER TABLE "PoliticianInRanking" DROP CONSTRAINT "PoliticianInRanking_stateAbbreviation_fkey";

-- AlterTable
ALTER TABLE "PoliticianInRanking" ALTER COLUMN "stateAbbreviation" DROP NOT NULL,
ALTER COLUMN "candidateType" DROP NOT NULL,
ALTER COLUMN "quantityVote" DROP NOT NULL,
ALTER COLUMN "reelected" DROP NOT NULL,
ALTER COLUMN "cutAidShift" DROP NOT NULL,
ALTER COLUMN "isPresident" DROP NOT NULL,
ALTER COLUMN "cutHousingAllowance" DROP NOT NULL,
ALTER COLUMN "cutRetirement" DROP NOT NULL,
ALTER COLUMN "requestedFamilyPassport" DROP NOT NULL,
ALTER COLUMN "quotaAmountSum" DROP NOT NULL,
ALTER COLUMN "scorePresence" DROP NOT NULL,
ALTER COLUMN "scoreSaveQuota" DROP NOT NULL,
ALTER COLUMN "scoreProcess" DROP NOT NULL,
ALTER COLUMN "scoreInternal" DROP NOT NULL,
ALTER COLUMN "scorePrivileges" DROP NOT NULL,
ALTER COLUMN "scoreWastage" DROP NOT NULL,
ALTER COLUMN "scoreTotal" DROP NOT NULL,
ALTER COLUMN "scoreRanking" DROP NOT NULL,
ALTER COLUMN "scoreRankingByPosition" DROP NOT NULL,
ALTER COLUMN "scoreRankingByParty" DROP NOT NULL,
ALTER COLUMN "scoreRankingByState" DROP NOT NULL,
ALTER COLUMN "scorePresenceFormula" DROP NOT NULL,
ALTER COLUMN "scoreProcessFormula" DROP NOT NULL,
ALTER COLUMN "scorePrivilegesFormula" DROP NOT NULL,
ALTER COLUMN "scoreSaveQuotaFormula" DROP NOT NULL,
ALTER COLUMN "scoreWastageFormula" DROP NOT NULL,
ALTER COLUMN "scoreTotalFormula" DROP NOT NULL,
ALTER COLUMN "parliamentarianCount" DROP NOT NULL,
ALTER COLUMN "parliamentarianStateCount" DROP NOT NULL,
ALTER COLUMN "parliamentarianStaffMaxYear" DROP NOT NULL,
ALTER COLUMN "parliamentarianQuotaMaxYear" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PoliticianInRanking" ADD CONSTRAINT "PoliticianInRanking_stateAbbreviation_fkey" FOREIGN KEY ("stateAbbreviation") REFERENCES "State"("abbreviation") ON DELETE SET NULL ON UPDATE CASCADE;
