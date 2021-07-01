import * as express from 'express';
import protectedRouter from './protected';
import publicRouter from './public';

const router = express.Router();

router.use('/api', protectedRouter);
router.use('/api', publicRouter);

export default router;
