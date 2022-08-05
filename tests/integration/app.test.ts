import app from '../../src/app.js';
import supertest from 'supertest';
import {prisma} from "../../src/database.js";
import { json } from 'express';
import { jest } from "@jest/globals";
import factories from '../factories/index.js';

jest.mock("../../src/utils/logger.utils.js");


beforeEach(async () => {
    // await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
});

afterAll(async () => {
    await prisma.$disconnect();
});

const status = {
    ok: 200,
    created: 201,
    noContent: 204,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    internalServerError: 500, 
}

describe('APP', ()=>{
    describe('Auth', () => {
        describe('Sign up', () => {

            it('should create a new user', async () => {
                const user = factories.user.createUser();
                const response = await supertest(app)
                    .post('/auth/sign-up')
                    .send({...user,});
                expect(response.status).toBe(status.created);
                await factories.user.deleteUserByEmail(user.email);
            })

            it('should conflict when try to create a new user with same email', async () => {
                const user = factories.user.createUser();
                const saved = factories.user.createUser();
                await factories.user.saveUserInDatabase(saved);

                const body = {...user, email: saved.email};

                const response = await supertest(app)
                    .post('/auth/sign-up')
                    .send(body);
                expect(response.status).toBe(status.conflict);
                await factories.user.deleteUserByEmail(saved.email);
            })

            it('should conflict when try to create a new user with same cpf', async () => {
                const user = factories.user.createUser();
                const saved = factories.user.createUser();
                await factories.user.saveUserInDatabase(saved);

                const body = {...user, cpf: saved.cpf};

                const response = await supertest(app)
                    .post('/auth/sign-up')
                    .send(body);
                expect(response.status).toBe(status.conflict);
                await factories.user.deleteUserByEmail(saved.email);
            })

            it ('should not create without email or cpf or password', async () => {
                const user = factories.user.createUser();
                delete user.cpf;
                delete user.email;

                const response = await supertest(app)
                    .post('/auth/sign-up')
                    .send({...user});
                
                expect(response.status).toBe(status.badRequest);
            });
        })
    
        describe('Sign in', () => {
        
            it('should sign in with valid credentials', async () => {
                const user = factories.user.createUser();
                await factories.user.saveUserInDatabase(user);
                const response = await supertest(app)
                    .post('/auth/sign-in')
                    .send({email: user.email, password: user.password});
                expect(response.status).toBe(status.ok);
                expect(response.body.token).toBeDefined();
                await factories.user.deleteUserByEmail(user.email);
            })
        });

    })
})

