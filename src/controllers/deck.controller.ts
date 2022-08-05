import { Request, Response } from "express";
import services from "../services/index.js";

async function getDeck (req: Request, res: Response) {
}

async function getDeckPacks (req: Request, res: Response) {
}

async function openAllDeckPacks (req: Request, res: Response) {
}

async function openOneDeckPack (req: Request, res: Response) {
}

async function pasteAllCards (req: Request, res: Response) {
}

async function pasteCard (req: Request, res: Response) {
}

export default {
    getDeck,
    getDeckPacks,
    openAllDeckPacks,
    openOneDeckPack,
    pasteAllCards,
    pasteCard
}