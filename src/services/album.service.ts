import repos from '../repositories/index.js';
import AppError from '../utils/errors/error.utils.js';
import Prisma, { Album } from '@prisma/client';
import rankingService from './ranking.service.js';
import pageService from './page.service.js';
import loggerUtils from '../utils/logger.utils.js';
import variables from './variables.js';
import services from './index.js';

type Element = Prisma.Album;
type CreateInput = Prisma.Prisma.AlbumCreateInput;
type UpdateInput = Prisma.Prisma.AlbumUpdateInput;

const repo = repos.album;

const _LAST_YEAR = variables.LAST_YEAR;

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
    loggerUtils.log('service', 'Creating last year album');
    const album = await createOrCrash({year: _LAST_YEAR, title: `Casa do Baralho`, description: ''});
    await pageService.createAlbumPages(_LAST_YEAR);
}


async function getByYear (year: number) : Promise<Element> {
    loggerUtils.log('service', 'Getting Album by year');
    const result = await repo.getByYear(year);
    return result;
}


async function getLastAlbum() {
    const album = await repo.getAlbumWithPageIds(_LAST_YEAR);
    return album;
}

export type FunctionalPage = {
    title: string,
    badge?: string,
    description?: string,
    color?: string,
    stickers: number[],
}

async function getCompleteLastAlbum() : Promise<AlbumResponse> {
    const completeAlbum = await repo.getCompleteAlbum(variables.LAST_YEAR);

    const stickersLine : number[] = [];

    const album = {
        ...completeAlbum,
        pages: []
    };
    const pages = {}
    const stickers = {}

    const pagesByParties:FunctionalPage[] = [];
    const pagesByStates:FunctionalPage[] = [];
    const pagesByStatesObj:{[key: string]: number} = {};


    for (const page of completeAlbum.pages) {


        pagesByParties.push({
            badge: page.badge,
            title: page.title,
            description: page.description,
            color: page.backgroundColor,
            stickers: page.stickers.map(s => s.id)
        })

        album.pages.push(page.id);
        pages[page.id] = {
            ...page,
            stickers: []
        }

        for (const sticker of page.stickers) {
            stickersLine.push(sticker.id);
            pages[page.id].stickers.push(sticker.id);
            stickers[sticker.id] = {
                ...sticker,
            }
            
            const stateAbb = sticker.politicianRecord?.stateAbbreviation ?? null;
            const stateName = sticker.politicianRecord?.state.name  ?? null;

            
            if (stateAbb && stateName) {
                
                console.log(pagesByStatesObj[stateAbb]);
                
                
                if (pagesByStatesObj[stateAbb] && pagesByStatesObj[stateAbb] > -1) {
                    pagesByStates[pagesByStatesObj[stateAbb]].stickers.push(sticker.id);
                } else {
                    pagesByStatesObj[stateAbb] = pagesByStates.length;
                    pagesByStates.push({
                        badge: stateAbb,
                        title: stateName,
                        description: `Estado`,
                        stickers: [sticker.id]
                    })
                }
                
            }

        }
    }


    return {album, pages, stickers, stickersLine, pagesByStates, pagesByParties};
}

type AlbumResponse = {
    album: Prisma.Album & {
        pages: number[];
    },
    pages: {
        [key: number]: (Prisma.Page & {
            stickers: number[];
        });
    },
    stickers: {
        [key: number]: Prisma.Sticker;
    },
    stickersLine: number[],
    pagesByStates: FunctionalPage[],
    pagesByParties: FunctionalPage[],
}


export default { 
    validateOrCrash, 
    getByYear, 
    createLastYear,
    getLastAlbum,
    getCompleteLastAlbum
};