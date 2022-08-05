import { Router } from "express";

import album from './album.router.js'
import auth from './auth.router.js'
import deck from './auth.router.js'
import ranking from './ranking.router.js'
import tinder from './tinder.router.js'
import user from './user.router.js'

const router = Router();

router.use('/album', album);
router.use('/auth', auth);
router.use('/deck', deck);
router.use('/ranking', ranking);
router.use('/tinder', tinder);
router.use('/user', user);

export default router;
