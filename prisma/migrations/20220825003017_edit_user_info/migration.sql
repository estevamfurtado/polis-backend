/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Person` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PoliticalPosition" AS ENUM ('left', 'right', 'center');

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "politicalPosition" "PoliticalPosition",
ADD COLUMN     "username" TEXT,
ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Person_username_key" ON "Person"("username");
