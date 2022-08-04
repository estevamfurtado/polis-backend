/*
  Warnings:

  - You are about to drop the column `telephone` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "telephone",
ADD COLUMN     "phone" TEXT;
