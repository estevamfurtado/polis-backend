import dotenv from 'dotenv';
import AppError from '../utils/errors/error.utils.js';
import personService from './person.service.js';
import repos from '../repositories/index.js';
import { crypt } from '../utils/crypt/index.js';
import { Person } from '@prisma/client';


async function signUp (password: string, email: string, name: string, cpf: string) {

    const newUser = await personService.createOrCrash({
        name,
        cpf,
        email,
        password: crypt.bcrypt.encrypt(password)
    });
    const token = crypt.jwt.create(newUser);
    return token;
}

async function signIn (password: string, email: string) {
    const user = await personService.findByEmailOrCrash(email);
    const encryptedPassword = await repos.person.getEncryptedPassword(email);
    await personService.validatePasswordOrCrash(password, encryptedPassword.password ?? '');
    const token = crypt.jwt.create(user);
    return token;
}

function validateTokenOrCrash (token: string) {
    const decoded = crypt.jwt.decode(token) as Person;
    if (!decoded) {
        throw AppError.unauthorized('Invalid token');
    }
    return decoded;
}




export default { signUp, signIn, validateTokenOrCrash };