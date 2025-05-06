import express from 'express';

// Importar todas as rotas
import authRouter from './auth.routes.js';
import animeRouter from './animeRoutes.js';
import personagemRouter from './personagemRoutes.js';
import collectionRouter from './collectionRoutes.js';
import cardRouter from './cardRoutes.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rotas públicas
router.use('auth', authRouter);
router.use('/collection', collectionRouter);
router.use('/card', cardRouter)

// Rotas protegidas
router.use(authMiddleware);
router.use('/anime', animeRouter);
router.use('/personagem', personagemRouter);

export default router;