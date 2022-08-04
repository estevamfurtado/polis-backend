/*
  Warnings:

  - You are about to drop the column `amount` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Ranking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "amount";

-- AlterTable
ALTER TABLE "Ranking" DROP COLUMN "description";
