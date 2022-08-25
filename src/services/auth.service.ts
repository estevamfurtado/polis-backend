import dotenv from 'dotenv';
import AppError from '../utils/errors/error.utils.js';
import personService from './person.service.js';
import repos from '../repositories/index.js';
import { crypt } from '../utils/crypt/index.js';
import { Person, PoliticalPosition, Prisma } from '@prisma/client';
import loggerUtils from '../utils/logger.utils.js';
import stateService from './state.service.js';
import albumService from './album.service.js';
import { number } from 'joi';


type SignUp = {
    username: string | null;
    password: string | null;
    voteStateAbbreviation: string | null;
    month: number | null;
    year: number | null;
    politicalPosition: string | null;
}



async function signUp (data: SignUp, referralId?: number) {

    loggerUtils.log('service', 'Signing Up');
    
    const input: Prisma.PersonCreateInput = {
        username: data.username.trim().toLowerCase(),
        password: crypt.bcrypt.encrypt(data.password),
        voteState: {connect: {abbreviation: data.voteStateAbbreviation}},
        birthDate: new Date(data.year, data.month),
        politicalPosition: data.politicalPosition as PoliticalPosition,
        isActive: true,
    }

    await personService.get.byUsername.andCrash(input.username);
    await stateService.validate.byAbbreviation.orCrash(data.voteStateAbbreviation);    
    
    // console.log(data);

    const newUser = await personService.create.orCrash(input);
    
    await personService.actions.signUpFreePacks(newUser.id);

    if (referralId) {
        await personService.actions.referredNewUser(referralId);
    }
}

async function migrateEmailToUsername(id: number, email: string) {
    let username = email.split('@')[0]
    let created = false;
    while (!created) {
        const existingUser = await personService.get.byUsername.only(username);
        if (!existingUser) {
            const newUser = await personService.update.byId(id, {username});
            return newUser;
        } else {
            username = username + `${Math.floor(Math.random() * 20)}`
        }
    }
}

async function signIn ({username, password}:{username: string, password: string}) {
    loggerUtils.log('service', 'Signing In');
    
    let user = await personService.get.byEmail.only(username);

    if (user && !user.username) {
        user = await migrateEmailToUsername(user.id, user.email)
    }
    if (!user) {
        user = await personService.get.byUsername.orCrash(username);
    }

    // console.log('tem user');

    await personService.validate.password.orCrash(password, user.password ?? '');
    
    await personService.actions.signInFreePacks(user.id);
    const token = crypt.jwt.create(user);

    // console.log(token);

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