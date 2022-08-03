/*
  Warnings:

  - You are about to drop the column `email` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `Person` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[createdById]` on the table `News` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdById` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Person_email_key";

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "email",
DROP COLUMN "surname",
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "News_createdById_key" ON "News"("createdById");

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
