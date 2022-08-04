import fs from 'fs';

interface ColumnDescription {
    name: string;
    type: string;
}

function read(fullFilePath: string) {
    const data = fs.readFileSync(fullFilePath).toString().replace(/^\uFEFF/, '');
    const matrix = stringToMatrix(data, ';');
    const header = matrix[0];

    const types = matrix[1];
    const array = [];
    for (let i = 2; i < matrix.length; i++) {
        const line = matrix[i];
        const obj = {};
        for (let j = 0; j < line.length; j++) {
            let value = line[j];
            const columnName = header[j];
            const columnType = types[j];

            value = value.replace(/�/g, '');

            obj[columnName] = stringToType(value, columnType);
        }
        array.push(obj);
    }

    return array;
}


function stringToMatrix (value: string, separator: string) {
    let cleanData = value.replace(/\r/g, '').replace(/�/g, '').replace('\r', '').replace(/^\uFEFF/, '');


    const lines = cleanData.split('\n');
    const result = lines.map(line => {
        return line.split(separator);
    })
    return result;
}


function stringToType (value: string, type: string) {
    if (type === 'string') {
        return value;
    } else if (type === 'number') {
        return Number(value);
    } else if (type === 'boolean') {
        return value === 'true';
    }
    return value;
}


export default {
    read
}