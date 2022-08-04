/*
  Warnings:

  - A unique constraint covering the columns `[officialId]` on the table `Politician` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `Person` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `officialId` to the `Politician` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "website" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;

-- AlterTable
ALTER TABLE "Politician" ADD COLUMN     "officialId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Politician_officialId_key" ON "Politician"("officialId");
