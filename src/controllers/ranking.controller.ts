import { Politician , State, Party, PartyRecord, Record } from "@prisma/client";
import { Request, Response } from "express";
import services from "../services/index.js";
import { arrayToObject } from "../utils/arrayToObject.js";



type RankingGroup = {
    title: string;
    color: string;
    records: number[];
}

type RankingResponse = {
    rankings: {
        parties: RankingGroup[];
        ranking: RankingGroup[];
    },
    politicians: { [key: number]: Politician },
    politicianRecords: { [key: number]: Record },
    partyRecords: { [key: number]: PartyRecord },
    states: { [key: string]: State },
    parties: { [key: string]: Party }
}

async function getRanking (req: Request, res: Response) {
        
    const rankingData = await services.ranking.getLastCompleteRanking();
    const data = processRankings();

    res.send(data);

    function processRankings () : RankingResponse {
        const politicians = {}; // ok
        const politicianRecords = {}; // ok
        const partyRecords = {}; // ok
        const states = {}; // ok
        const parties = {}; // ok
        
        const rankings : {parties: RankingGroup[], ranking: RankingGroup[]} = {
            parties: [],
            ranking: [
                {title: 'Top 10', color: 'green.400', records: []},
                {title: 'Top 50', color: 'blue.400', records: []},
                {title: 'Top 100', color: 'orange.400', records: []},
                {title: 'Top 250', color: 'purple.400', records: []},
                {title: 'Outros', color: 'red.400', records: []},
            ]
        };


        for (const partyRecord of rankingData.partyRecords) {
            if (!partyRecords[partyRecord.id]) {partyRecords[partyRecord.id] = partyRecord;}
            if (!parties[partyRecord.partyAbbreviation]) {parties[partyRecord.partyAbbreviation] = partyRecord.party;}
            
            // Ranking by party
            const group = {
                title: partyRecord.partyAbbreviation,
                color: partyRecord.party.mainColor,
                records: partyRecord.records.map(r => r.id)
            }
            rankings.parties.push(group)
        }

        for (const record of rankingData.records) {
            if (!politicians[record.politicianId]) {politicians[record.politicianId] = record.politician;}
            if (!states[record.stateAbbreviation]) {states[record.stateAbbreviation] = record.state;}
            if (!parties[record.partyAbbreviation]) {parties[record.partyAbbreviation] = record.party;}
            if (!politicianRecords[record.id]) {politicianRecords[record.id] = record;}
            
            // Ranking by Ranking
            let index = 4;
            if (record.scoreRanking <= 10) {index = 0}
            else if (record.scoreRanking <= 50) {index = 1}
            else if (record.scoreRanking <= 100) {index = 2}
            else if (record.scoreRanking <= 250) {index = 3}
            rankings.ranking[index].records.push(record.id);

        }


        return {
            rankings,
            politicians,
            politicianRecords,
            partyRecords,
            states,
            parties
        }
    }
}

async function getPolitician (req: Request, res: Response) {
}

export default {
    getRanking, getPolitician
}