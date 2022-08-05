import database from '../src/database.js';


database.prisma.$queryRaw`
    DROP schema public;
    CREATE SCHEMA public;
`