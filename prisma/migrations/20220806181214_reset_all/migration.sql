-- CreateEnum
CREATE TYPE "PartyScoreTypes" AS ENUM ('scorePresence', 'scoreSaveQuota', 'scoreProcess', 'scoreInternal', 'scorePrivileges', 'scoreWastage', 'scoreTotal');

-- CreateEnum
CREATE TYPE "EconomicClass" AS ENUM ('A', 'B', 'C', 'D', 'E');

-- CreateEnum
CREATE TYPE "SkinColor" AS ENUM ('White', 'Black', 'Brown', 'Yellow', 'Other');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "ReactionTypes" AS ENUM ('like', 'dislike');

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("abbreviation")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "birthDate" TIMESTAMP(3),
    "sex" "Sex",
    "gender" TEXT,
    "economicClass" "EconomicClass",
    "skinColor" "SkinColor",
    "voteStateAbbreviation" TEXT,
    "diplomaticAxis" INTEGER,
    "economicAxis" INTEGER,
    "civilAxis" INTEGER,
    "socialAxis" INTEGER,
    "packs" INTEGER NOT NULL DEFAULT 18,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Party" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "abbreviation" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "mainColor" TEXT,
    "secondaryColor" TEXT,
    "about" TEXT,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("abbreviation")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "twitter" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "linkedin" TEXT,
    "youtube" TEXT,
    "website" TEXT,
    "personId" INTEGER,
    "partyAbbreviation" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,
    "partyAbbreviation" TEXT NOT NULL,
    "stateAbbreviation" TEXT NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Politician" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,
    "officialId" TEXT NOT NULL,
    "partyAbbreviation" TEXT NOT NULL,
    "stateAbbreviation" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Politician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "ReactionTypes" NOT NULL,
    "personId" INTEGER NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ranking" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "politicianId" INTEGER,
    "sourceId" TEXT,
    "sourceUrl" TEXT,
    "sourceName" TEXT,
    "rankingId" INTEGER NOT NULL,
    "partyRecordId" INTEGER NOT NULL,
    "partyAbbreviation" TEXT,
    "stateAbbreviation" TEXT,
    "candidateType" TEXT,
    "quantityVote" INTEGER,
    "reelected" BOOLEAN,
    "cutAidShift" BOOLEAN,
    "isPresident" BOOLEAN,
    "cutHousingAllowance" BOOLEAN,
    "cutRetirement" BOOLEAN,
    "requestedFamilyPassport" BOOLEAN,
    "quotaAmountSum" INTEGER,
    "scorePresence" DOUBLE PRECISION,
    "scoreSaveQuota" DOUBLE PRECISION,
    "scoreProcess" DOUBLE PRECISION,
    "scoreInternal" DOUBLE PRECISION,
    "scorePrivileges" DOUBLE PRECISION,
    "scoreWastage" DOUBLE PRECISION,
    "scoreTotal" DOUBLE PRECISION,
    "scoreRanking" INTEGER,
    "scoreRankingByPosition" INTEGER,
    "scoreRankingByParty" INTEGER,
    "scoreRankingByState" INTEGER,
    "scorePresenceFormula" TEXT,
    "scoreProcessFormula" TEXT,
    "scorePrivilegesFormula" TEXT,
    "scoreSaveQuotaFormula" TEXT,
    "scoreWastageFormula" TEXT,
    "scoreTotalFormula" TEXT,
    "parliamentarianCount" INTEGER,
    "parliamentarianStateCount" INTEGER,
    "parliamentarianStaffMaxYear" DOUBLE PRECISION,
    "parliamentarianQuotaMaxYear" DOUBLE PRECISION,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartyRecord" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rankingId" INTEGER NOT NULL,
    "partyId" INTEGER NOT NULL,
    "partyAbbreviation" TEXT NOT NULL,

    CONSTRAINT "PartyRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartyScore" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "PartyScoreTypes" NOT NULL,
    "totalScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "count" INTEGER DEFAULT 0,
    "average" DOUBLE PRECISION DEFAULT 0,
    "partyRecordId" INTEGER NOT NULL,

    CONSTRAINT "PartyScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "coverUrl" TEXT,
    "thumbUrl" TEXT,
    "entryPageId" INTEGER,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "backgroundColor" TEXT,
    "successorId" INTEGER,
    "albumId" INTEGER NOT NULL,
    "entryStickerId" INTEGER,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sticker" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pageId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,
    "identifier" TEXT NOT NULL,
    "successorId" INTEGER,

    CONSTRAINT "Sticker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardModel" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recordId" INTEGER,
    "variant" TEXT NOT NULL DEFAULT E'normal',
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "CardModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modelId" INTEGER NOT NULL,
    "isPasted" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" INTEGER,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "State_id_key" ON "State"("id");

-- CreateIndex
CREATE UNIQUE INDEX "State_abbreviation_key" ON "State"("abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "Person_cpf_key" ON "Person"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Party_id_key" ON "Party"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Party_cnpj_key" ON "Party"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Party_abbreviation_key" ON "Party"("abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_personId_key" ON "Contact"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_partyAbbreviation_key" ON "Contact"("partyAbbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_personId_key" ON "Candidate"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateShortVideo_candidateId_key" ON "CandidateShortVideo"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "Politician_personId_key" ON "Politician"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Politician_officialId_key" ON "Politician"("officialId");

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_year_key" ON "Ranking"("year");

-- CreateIndex
CREATE UNIQUE INDEX "Record_rankingId_politicianId_key" ON "Record"("rankingId", "politicianId");

-- CreateIndex
CREATE UNIQUE INDEX "PartyRecord_rankingId_partyId_key" ON "PartyRecord"("rankingId", "partyId");

-- CreateIndex
CREATE UNIQUE INDEX "PartyScore_partyRecordId_type_key" ON "PartyScore"("partyRecordId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Album_year_key" ON "Album"("year");

-- CreateIndex
CREATE UNIQUE INDEX "Album_entryPageId_key" ON "Album"("entryPageId");

-- CreateIndex
CREATE UNIQUE INDEX "Album_year_title_key" ON "Album"("year", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Page_successorId_key" ON "Page"("successorId");

-- CreateIndex
CREATE UNIQUE INDEX "Page_entryStickerId_key" ON "Page"("entryStickerId");

-- CreateIndex
CREATE UNIQUE INDEX "Page_albumId_title_key" ON "Page"("albumId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Sticker_successorId_key" ON "Sticker"("successorId");

-- CreateIndex
CREATE UNIQUE INDEX "Sticker_pageId_identifier_key" ON "Sticker"("pageId", "identifier");

-- CreateIndex
CREATE UNIQUE INDEX "CardModel_recordId_key" ON "CardModel"("recordId");

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_voteStateAbbreviation_fkey" FOREIGN KEY ("voteStateAbbreviation") REFERENCES "State"("abbreviation") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_partyAbbreviation_fkey" FOREIGN KEY ("partyAbbreviation") REFERENCES "Party"("abbreviation") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_stateAbbreviation_fkey" FOREIGN KEY ("stateAbbreviation") REFERENCES "State"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_partyAbbreviation_fkey" FOREIGN KEY ("partyAbbreviation") REFERENCES "Party"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateShortVideo" ADD CONSTRAINT "CandidateShortVideo_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Politician" ADD CONSTRAINT "Politician_stateAbbreviation_fkey" FOREIGN KEY ("stateAbbreviation") REFERENCES "State"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Politician" ADD CONSTRAINT "Politician_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Politician" ADD CONSTRAINT "Politician_partyAbbreviation_fkey" FOREIGN KEY ("partyAbbreviation") REFERENCES "Party"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_stateAbbreviation_fkey" FOREIGN KEY ("stateAbbreviation") REFERENCES "State"("abbreviation") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_partyAbbreviation_fkey" FOREIGN KEY ("partyAbbreviation") REFERENCES "Party"("abbreviation") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_politicianId_fkey" FOREIGN KEY ("politicianId") REFERENCES "Politician"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "Ranking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_partyRecordId_fkey" FOREIGN KEY ("partyRecordId") REFERENCES "PartyRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyRecord" ADD CONSTRAINT "PartyRecord_partyAbbreviation_fkey" FOREIGN KEY ("partyAbbreviation") REFERENCES "Party"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyRecord" ADD CONSTRAINT "PartyRecord_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "Ranking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartyScore" ADD CONSTRAINT "PartyScore_partyRecordId_fkey" FOREIGN KEY ("partyRecordId") REFERENCES "PartyRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_entryPageId_fkey" FOREIGN KEY ("entryPageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_successorId_fkey" FOREIGN KEY ("successorId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_entryStickerId_fkey" FOREIGN KEY ("entryStickerId") REFERENCES "Sticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sticker" ADD CONSTRAINT "Sticker_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sticker" ADD CONSTRAINT "Sticker_successorId_fkey" FOREIGN KEY ("successorId") REFERENCES "Sticker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sticker" ADD CONSTRAINT "Sticker_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CardModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardModel" ADD CONSTRAINT "CardModel_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "Record"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "CardModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
