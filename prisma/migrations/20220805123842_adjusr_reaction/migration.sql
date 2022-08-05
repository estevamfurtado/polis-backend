/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Reaction` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Reaction_candidateId_key";

-- DropIndex
DROP INDEX "Reaction_personId_key";

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "imageUrl",
ADD COLUMN     "comment" TEXT;
