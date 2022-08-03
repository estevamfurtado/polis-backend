import csvParser from './csvParser.js';

const fileDescription = [
    {name: 'name', type: String},
    {name: 'abbreviation', type: String},
]

const states = csvParser.fileToObj('states.csv', fileDescription);

export default states;
