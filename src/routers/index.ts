import { Router } from "express";

import album from './album.router.js'
import auth from './auth.router.js'
import deck from './deck.router.js'
import ranking from './ranking.router.js'
import user from './user.router.js'

const router = Router();

router.use('/album', album);
router.use('/auth', auth);
router.use('/deck', deck);
router.use('/ranking', ranking);
router.use('/user', user);

export default router;
