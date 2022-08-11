/*
  Warnings:

  - You are about to drop the column `isNew` on the `Card` table. All the data in the column will be lost.
  - Added the required column `badge` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "isNew",
ADD COLUMN     "forExchange" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "badge" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "packs" SET DEFAULT 0;
