import { Router } from 'express';
import { getAllTodos, getTodo, addTodo, updateTodo } from '../controllers/todo';

const router: Router = Router();

router.get('/', getAllTodos);
router.get('/:id', getTodo);
router.post('/', addTodo);
router.put('/:id', updateTodo);

export default router;
