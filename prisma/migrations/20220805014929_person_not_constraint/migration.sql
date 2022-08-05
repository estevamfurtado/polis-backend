-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_voteStateAbbreviation_fkey";

-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "voteStateAbbreviation" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_voteStateAbbreviation_fkey" FOREIGN KEY ("voteStateAbbreviation") REFERENCES "State"("abbreviation") ON DELETE SET NULL ON UPDATE CASCADE;
