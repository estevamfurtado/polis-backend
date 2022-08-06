import Cryptr from "cryptr"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appError from "../errors/error.utils.js"

const secretKey = process.env.JWT_SECRET ?? 'JWT_SECRET';
const cryptrSecret = process.env.JWT_SECRET ?? 'JWT_SECRET';
const cryptr = new Cryptr(cryptrSecret);

function encryptCryptr (value: string) {
    const encryptedPassword = cryptr.encrypt(value);
    return encryptedPassword;
} 
function decryptCryptr (value: string) {
    const decryptedPassword = cryptr.decrypt(value);
    return decryptedPassword;
} 


function createToken (saveData: any) {
    const data = {...saveData};
    const config = { expiresIn: '6h' };
    const token = jwt.sign(data, secretKey, config);
    return token;
}

function decodeToken (token: string) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (e) {
        throw appError.unauthorized("Invalid token");
    }
}

function encryptBcrypt (value: string) {
    const encryptedPassword = bcrypt.hashSync(value, bcrypt.genSaltSync(8)) as string;
    return encryptedPassword;
}
function compareBcrypt (value: string, encryptedValue: string) {
    const isValid = bcrypt.compareSync(value, encryptedValue);
    return isValid;
}

export const crypt = {
    cryptr: {encrypt: encryptCryptr, decrypt: decryptCryptr},
    bcrypt: {encrypt: encryptBcrypt, compare: compareBcrypt},
    jwt: {create: createToken, decode: decodeToken},
}
