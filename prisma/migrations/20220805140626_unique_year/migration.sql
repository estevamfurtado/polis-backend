/*
  Warnings:

  - A unique constraint covering the columns `[year]` on the table `Album` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Album_year_key" ON "Album"("year");
