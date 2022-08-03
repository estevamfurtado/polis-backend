import csvParser from './csvParser.js';


const fileDescription = [
    {name: 'type', type: String},
    {name: 'cnpj', type: String},
    {name: 'name', type: String},
    {name: 'abbreviation', type: String},
    {name: 'logoUrl', type: String},
    {name: 'mainColor', type: String},
]

const politicalParties = csvParser.fileToObj('politicalParties.csv', fileDescription);

export default politicalParties;