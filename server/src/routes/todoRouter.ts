import { Router } from 'express';
import { getAllTodos, getTodo, addTodo, updateTodo } from '../controllers/todo';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router: Router = Router();

router.get('/', getAllTodos);
router.get('/:id', getTodo);
router.post('/', ValidateJoi(Schemas.todo.create), addTodo);
router.put('/:id', ValidateJoi(Schemas.todo.update), updateTodo);

export default router;
