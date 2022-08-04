/*
  Warnings:

  - Added the required column `imageUrl` to the `Politician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Sentiment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "youtube" TEXT;

-- AlterTable
ALTER TABLE "Politician" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sentiment" ADD COLUMN     "imageUrl" TEXT NOT NULL;
