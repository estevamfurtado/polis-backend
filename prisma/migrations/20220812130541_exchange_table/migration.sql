-- CreateEnum
CREATE TYPE "ExchangeStatus" AS ENUM ('pending', 'accepted', 'rejected');

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "forExchange" SET DEFAULT true;

-- CreateTable
CREATE TABLE "ExchangeRequest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ExchangeStatus" NOT NULL DEFAULT E'pending',
    "proposerId" INTEGER NOT NULL,
    "requestedId" INTEGER NOT NULL,

    CONSTRAINT "ExchangeRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CardExchangeOfferedCard" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CardExchangeRequestedCard" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CardExchangeOfferedCard_AB_unique" ON "_CardExchangeOfferedCard"("A", "B");

-- CreateIndex
CREATE INDEX "_CardExchangeOfferedCard_B_index" ON "_CardExchangeOfferedCard"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CardExchangeRequestedCard_AB_unique" ON "_CardExchangeRequestedCard"("A", "B");

-- CreateIndex
CREATE INDEX "_CardExchangeRequestedCard_B_index" ON "_CardExchangeRequestedCard"("B");

-- AddForeignKey
ALTER TABLE "ExchangeRequest" ADD CONSTRAINT "ExchangeRequest_proposerId_fkey" FOREIGN KEY ("proposerId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExchangeRequest" ADD CONSTRAINT "ExchangeRequest_requestedId_fkey" FOREIGN KEY ("requestedId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardExchangeOfferedCard" ADD CONSTRAINT "_CardExchangeOfferedCard_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardExchangeOfferedCard" ADD CONSTRAINT "_CardExchangeOfferedCard_B_fkey" FOREIGN KEY ("B") REFERENCES "ExchangeRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardExchangeRequestedCard" ADD CONSTRAINT "_CardExchangeRequestedCard_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardExchangeRequestedCard" ADD CONSTRAINT "_CardExchangeRequestedCard_B_fkey" FOREIGN KEY ("B") REFERENCES "ExchangeRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
