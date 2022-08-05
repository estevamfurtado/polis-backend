import fs from 'fs';
import paths from './paths.js';

type Original = {
    prefix: string;
    name: string;
    suffix: string;
    searchValues: string[]
}

type Copy = {
    name: string;
    replaceValues: string[]
}

function replicateManyFiles (folderPath: string, original: Original, copies: Copy[]) {

    const originalFilePath = `${folderPath}/${original.prefix}${original.name}${original.suffix}`;
    
    console.log(`Replicating... > ${originalFilePath}`);
    const originalFile = fs.readFileSync(originalFilePath).toString();
    
    copies.forEach(copy => {
        const copyFilePath = `${folderPath}/${original.prefix}${copy.name}${original.suffix}`;
        createFileFromText(copyFilePath, originalFile, original.searchValues, copy);
    })
}

function createFileFromText(filePath: string, text: string, searchValues: string[], copy: Copy) {
    console.log(`Trying to create... > ${filePath}`);
    if (!fs.existsSync(filePath)) {
        let newText = text;
        copy.replaceValues.forEach((replace, index) => {
            const search = searchValues[index];
            if (search) {
                newText = newText.replace(new RegExp(search, 'g'), replace);
            }
        })
        fs.writeFileSync(filePath, newText);
    }
}


// State, Person, PoliticalParty, Contact, Candidate, CandidateShortVideo,
// Politician, Reaction, Ranking, RankingRecord, Album, AlbumPage,
// Sticker, CardModel, Card, UserAlbum


const original = {
    prefix: '',
    name: 'person',
    searchValues: ['Person', 'person']
}

const copies = [
    {name: 'state', replaceValues: ['State', 'state']},
    {name: 'person', replaceValues: ['Person', 'person']},
    {name: 'politicalParty', replaceValues: ['PoliticalParty', 'politicalParty']},
    {name: 'contact', replaceValues: ['Contact', 'contact']},
    {name: 'candidate', replaceValues: ['Candidate', 'candidate']},
    {name: 'candidateShortVideo', replaceValues: ['CandidateShortVideo', 'candidateShortVideo']},
    {name: 'politician', replaceValues: ['Politician', 'politician']},
    {name: 'reaction', replaceValues: ['Reaction', 'reaction']},
    {name: 'ranking', replaceValues: ['Ranking', 'ranking']},
    {name: 'rankingRecord', replaceValues: ['RankingRecord', 'rankingRecord']},
    {name: 'album', replaceValues: ['Album', 'album']},
    {name: 'albumPage', replaceValues: ['AlbumPage', 'albumPage']},
    {name: 'sticker', replaceValues: ['Sticker', 'sticker']},
    {name: 'cardModel', replaceValues: ['CardModel', 'cardModel']},
    {name: 'card', replaceValues: ['Card', 'card']},
    {name: 'userAlbum', replaceValues: ['UserAlbum', 'userAlbum']}
]

function replicateRepositories () {
    const addaptedOriginal = {...original, suffix: '.service.ts'};
    replicateManyFiles(paths.services, addaptedOriginal, copies);
}

// ------------------------

function main () {
    replicateRepositories();
}

main();