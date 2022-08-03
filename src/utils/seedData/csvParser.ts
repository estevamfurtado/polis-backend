import fs from 'fs';
import path from 'path';
import {csvToObj} from 'csv-to-js-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fileToObj(file: string, description: ColumnDescription[]) {
    const filePath = path.resolve(__dirname, './csv/' + file);
    const data = fs.readFileSync(filePath).toString();
    const obj = csvStringToObject(data, ';', description);
    return obj;
}

interface ColumnDescription {
    name: string;
    type: typeof String | typeof Number | typeof Boolean;
}


function csvStringToObject (data: string, separator: string, description: ColumnDescription[]) {    

    const cleanData = data.replace(/\r/g, '');
    const lines = cleanData.replace('\r', '').split('\n');
    const header = lines[0].split(separator);
    const list = lines.slice(1);
    const result = list.map(line => {
        const obj = {};
        line.split(separator).forEach((value, index) => {
            const column = description[index];
            obj[column.name] = stringToType(value, column.type)
        });
        return obj;
    })
    return result;
}

function stringToType (value: string, type: typeof String | typeof Number | typeof Boolean) {
    if (type === String) {
        return value;
    } else if (type === Number) {
        return Number(value);
    } else if (type === Boolean) {
        return value === 'true';
    }
}

export default {
    fileToObj
}