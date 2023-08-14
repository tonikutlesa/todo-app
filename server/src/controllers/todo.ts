import { Response, Request } from 'express';
import { Types } from 'mongoose';
import { ITodo } from '../types/todo';
import Todo from '../models/Todo';
import Logger from '../utils/Logger';

const getAllTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const todos: ITodo[] = await Todo.find().sort({ createdAt: sortDirection });

    res.status(200).json({ todos });
  } catch (error) {
    Logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id }
    } = req;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid id format' });
      return;
    }

    const todo: ITodo | null = await Todo.findById(id);

    if (!todo) {
      res.status(404).json({ message: `Todo with id: '${id}' not found` });
      return;
    }

    res.status(200).json({ todo });
  } catch (error) {
    Logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, 'text' | 'done'>;

    const todo: ITodo = new Todo({
      text: body.text,
      done: body.done
    });

    const newTodo: ITodo = await todo.save();

    res.status(201).json({ todo: newTodo });
  } catch (error) {
    Logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body
    } = req;

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid id format' });
      return;
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      res.status(404).json({ message: `Todo with id: '${id}' not found` });
      return;
    }

    const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate({ _id: id }, body, { new: true });

    if (todo.done === false && updatedTodo?.done === true) {
      // TODO: send actual SMS and add Logger.info()
      console.log('send SMS');
    }

    res.status(200).json({
      todo: updatedTodo
    });
  } catch (error) {
    Logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllTodos, getTodo, addTodo, updateTodo };
