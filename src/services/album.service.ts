import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma, { Album } from '@prisma/client';
import rankingService from './ranking.service.js';
import pageService from './page.service.js';
import loggerUtils from '../utils/logger.utils.js';

type Element = Prisma.Album;
type CreateInput = Prisma.Prisma.AlbumCreateInput;
type UpdateInput = Prisma.Prisma.AlbumUpdateInput;

const repo = repos.album;

const _LAST_YEAR = 2022;

async function validateOrCrash (id: number) : Promise<Element> {
    const result = await repo.get(id);
    if (!result) {
        throw AppError.notFound(`Album with id ${id} does not exist`);
    }
    return result;
}

async function createOrCrash (album: CreateInput) {
    const result = await repo.create(album);
    if (!result) {
        throw AppError.conflict(`Album with '${album.title} (${album.year})' could not be created`);
    }
    return result;
}

async function createLastYear () {
    const ranking = await rankingService.validateOrCrashByYear(_LAST_YEAR);
    const album = await createOrCrash({year: _LAST_YEAR, title: 'Casa do Baralho', description: ''});
    await pageService.createAlbumBasePages(album.id, ranking.id);
}


async function getByYear (year: number) : Promise<Element> {
    loggerUtils.log('service', 'Getting Album by year');
    const result = await repo.getByYear(year);
    return result;
}

async function getLastAlbumWithDetails () {
    const album = await repo.getByYear(_LAST_YEAR);
    return album;
}

export default { 
    validateOrCrash, 
    getByYear, 
    getLastAlbumWithDetails,
    createLastYear
};