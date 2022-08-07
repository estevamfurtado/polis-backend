-- DropForeignKey
ALTER TABLE "PartyRecord" DROP CONSTRAINT "PartyRecord_rankingYear_fkey";

-- AddForeignKey
ALTER TABLE "PartyRecord" ADD CONSTRAINT "PartyRecord_rankingYear_fkey" FOREIGN KEY ("rankingYear") REFERENCES "Ranking"("year") ON DELETE RESTRICT ON UPDATE CASCADE;
