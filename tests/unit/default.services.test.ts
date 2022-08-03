import { jest } from "@jest/globals";
import { prisma } from "../../src/database.js";

// jest.mock("../../src/repositories/recommendationRepository.js");

beforeAll(async () => {
    // await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
});

afterAll(async () => {
    await prisma.$disconnect();
});


describe("Default", () => {

})
