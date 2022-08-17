import { Politician , State, Party, PartyRecord, Record } from "@prisma/client";
import { Request, Response } from "express";
import services from "../services/index.js";
import { arrayToObject } from "../utils/arrayToObject.js";



type RankingGroup = {
    title: string;
    color: string;
    politicians: number[];
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
        
        const rankings = {
            parties: [],
            ranking: [
                {title: 'Top 10', color: 'green.400', politicians: []},
                {title: 'Top 50', color: 'blue.400', politicians: []},
                {title: 'Top 100', color: 'orange.400', politicians: []},
                {title: 'Top 250', color: 'purple.400', politicians: []},
                {title: 'Outros', color: 'red.400', politicians: []},
            ]
        };

        for (const record of rankingData.records) {
            if (!politicians[record.politicianId]) {politicians[record.politicianId] = record.politician;}
            if (!states[record.stateAbbreviation]) {states[record.stateAbbreviation] = record.state;}
            if (!parties[record.partyAbbreviation]) {parties[record.partyAbbreviation] = record.party;}
            if (!politicianRecords[record.politicianId]) {politicianRecords[record.politicianId] = record;}
            
            let index = 4;
            if (record.scoreRanking <= 10) {index = 0}
            else if (record.scoreRanking <= 50) {index = 1}
            else if (record.scoreRanking <= 100) {index = 2}
            else if (record.scoreRanking <= 250) {index = 3}
            rankings.ranking[index].politicians.push(record.politicianId);
        }
        for (const partyRecord of rankingData.partyRecords) {
            if (!partyRecords[partyRecord.id]) {partyRecords[partyRecord.id] = partyRecord;}
            if (!parties[partyRecord.partyAbbreviation]) {parties[partyRecord.partyAbbreviation] = partyRecord.party;}
            const group = {
                title: partyRecord.partyAbbreviation,
                color: partyRecord.party.mainColor,
                politicians: partyRecord.records.map(r => r.politicianId)
            }
            rankings.parties.push(group)
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