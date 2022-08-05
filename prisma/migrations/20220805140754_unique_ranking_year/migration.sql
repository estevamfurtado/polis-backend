/*
  Warnings:

  - A unique constraint covering the columns `[year]` on the table `Ranking` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Ranking_year_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_year_key" ON "Ranking"("year");
