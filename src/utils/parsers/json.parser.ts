import fs from 'fs';


function write(data: any, fullFilePath: string) {
    const jsonData = JSON.stringify({date: new Date(), data});
    const file = fs.writeFileSync(fullFilePath, jsonData, 'utf8');
}

function read(fullFilePath: string) {
    const content = fs.readFileSync(fullFilePath, 'utf8')
    const string = content.toString().replace(/^\uFEFF/, '').replace(/�/g, '').replace(/\r/g, '');
    const jsonData = JSON.parse(string);
    return jsonData;
}

export default {
    read, write
}