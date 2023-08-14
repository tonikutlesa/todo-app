import { Router } from 'express';
import todosRouter from './todoRouter';

const router: Router = Router();

router.use('/todos', todosRouter);

export default router;
