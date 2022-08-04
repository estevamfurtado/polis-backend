-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_organizationAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_personId_fkey";

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "organizationAbbreviation" DROP NOT NULL,
ALTER COLUMN "personId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_organizationAbbreviation_fkey" FOREIGN KEY ("organizationAbbreviation") REFERENCES "Organization"("abbreviation") ON DELETE SET NULL ON UPDATE CASCADE;
