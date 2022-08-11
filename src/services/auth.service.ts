import dotenv from 'dotenv';
import AppError from '../utils/errors/error.utils.js';
import personService from './person.service.js';
import repos from '../repositories/index.js';
import { crypt } from '../utils/crypt/index.js';
import { Person, Prisma } from '@prisma/client';
import loggerUtils from '../utils/logger.utils.js';
import stateService from './state.service.js';
import albumService from './album.service.js';


type SignUp = Prisma.PersonCreateInput&{voteStateAbbreviation: string};

async function signUp (data: SignUp, referralId?: number) {

    loggerUtils.log('service', 'Signing Up');
    
    await personService.get.byEmail.andCrash(data.email);
    await stateService.validate.byAbbreviation.orCrash(data.voteStateAbbreviation);
    data.voteState = {connect: {abbreviation: data.voteStateAbbreviation}};
    delete data.voteStateAbbreviation;

    data.cpf = data.cpf.replace(/\./g, '').replace(/-/g, '');
    data.password = crypt.bcrypt.encrypt(data.password);
    data.birthDate = new Date(data.birthDate);

    await personService.get.byCpf.andCrash(data.cpf);
    
    const newUser = await personService.create.orCrash(data);
    
    await personService.actions.signUpFreePacks(newUser.id);

    if (referralId) {
        await personService.actions.referredNewUser(referralId);
    }
}

async function signIn (dados: {email: string, password: string}) {
    loggerUtils.log('service', 'Signing In');
    const user = await personService.get.byEmail.orCrash(dados.email);
    const encryptedPassword = await repos.person.get.encryptedPasword.whereEmail(dados.email);
    await personService.validate.password.orCrash(dados.password, encryptedPassword.password ?? '');
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