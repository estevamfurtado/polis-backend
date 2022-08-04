-- CreateTable
CREATE TABLE "CandidateShortVideo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail" TEXT,
    "candidateId" INTEGER NOT NULL,

    CONSTRAINT "CandidateShortVideo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CandidateShortVideo_candidateId_key" ON "CandidateShortVideo"("candidateId");

-- AddForeignKey
ALTER TABLE "CandidateShortVideo" ADD CONSTRAINT "CandidateShortVideo_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
