import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma from '@prisma/client';
import rankingService from './ranking.service.js';
import albumPageService from './albumPage.service.js';

type Element = Prisma.Album;
type CreateInput = Prisma.Prisma.AlbumCreateInput;
type UpdateInput = Prisma.Prisma.AlbumUpdateInput;

const repo = repos.album;

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

async function createYearBaseModel (year: number) {
    const ranking = await rankingService.validateOrCrashByYear(year);
    const album = await createOrCrash({year, title: 'Casa do Baralho', description: ''});
    await albumPageService.createAlbumBasePages(album.id, ranking.id);
}

export default { validateOrCrash, createYearBaseModel };