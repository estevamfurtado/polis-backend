import { faker } from "@faker-js/faker";
import database from "../../src/database.js";
import services from "../../src/services/index.js";
import { crypt } from "../../src/utils/crypt/index.js";


function createUser() {

    const cpf_number = faker.random.numeric(11);
    const cpf = cpf_number.substring(0, 3) + '.' + cpf_number.substring(3, 6) + '.' + cpf_number.substring(6, 9) + '-' + cpf_number.substring(9, 11);

    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
        cpf,
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        voteStateAbbreviation: 'RJ',
        birthDate: faker.date.past(),
        skinColor: 'White',
        economicClass: 'A',
        diplomaticAxis: Number(faker.random.numeric(2)),
        economicAxis: Number(faker.random.numeric(2))
    }
}

function transformInInput(user = createUser()) {

    const {voteStateAbbreviation, ...rest} = user;

    let userAdapted = {
        ...rest,
        voteState: {connect: {abbreviation: voteStateAbbreviation}},
        cpf: user.cpf.replace(/\./g, '').replace(/-/g, ''),
    };

    return userAdapted;
}

async function saveUserInDatabase(user = createUser()) {
    const transformedUser = transformInInput(user) as any; 
    transformedUser.password = crypt.bcrypt.encrypt(transformedUser.password);
    return database.prisma.person.create({
        data: {
            ...transformedUser
        }
    })
}

async function deleteUserByEmail(email: string) {
    return database.prisma.person.deleteMany({
        where: {
            email
        }
    })
}

export default {
    createUser,
    saveUserInDatabase,
    deleteUserByEmail
}