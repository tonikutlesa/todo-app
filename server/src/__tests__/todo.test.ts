import request from 'supertest';
import app from '../app';
import { startServer } from '../server';
import { ITodo } from '../types/todo';

describe('Todo Routes', () => {
  beforeAll(() => {
    startServer(8081);
  });

  it('should get all todos', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.status).toBe(200);
  });

  it('should get a single todo by ID', async () => {
    const todosResponse = await request(app).get('/api/todos');
    expect(todosResponse.status).toBe(200);

    const todos: ITodo[] = todosResponse.body.todos;

    if (todos.length === 0) {
      test.skip('No todos to fetch', () => {});
      return;
    }

    const firstTodoId = todos[0]._id;

    const response = await request(app).get(`/api/todos/${firstTodoId}`);
    expect(response.status).toBe(200);
  });

  it('should return a 400 status when getting a todo by invalid ID format', async () => {
    const idWithInvalidFormat = 'invalid-id-format';
    const response = await request(app).get(`/api/todos/${idWithInvalidFormat}`);
    expect(response.status).toBe(400);
  });

  it('should add a new todo', async () => {
    const newTodo = { text: 'New Todo' };
    const response = await request(app).post('/api/todos').send(newTodo);
    expect(response.status).toBe(201);
  });

  it('should update a todo by ID', async () => {
    const todosResponse = await request(app).get('/api/todos');
    expect(todosResponse.status).toBe(200);

    const todos: ITodo[] = todosResponse.body.todos;

    if (todos.length === 0) {
      test.skip('No todos to fetch', () => {});
      return;
    }

    const firstTodoId = todos[0]._id;

    const todoUpdates = { text: 'Updated Todo' };
    const response = await request(app).put(`/api/todos/${firstTodoId}`).send(todoUpdates);
    expect(response.status).toBe(200);
  });

  it('should return a 400 status when updating a todo by invalid ID format', async () => {
    const idWithInvalidFormat = 'invalid-id-format';
    const response = await request(app).put(`/api/todos/${idWithInvalidFormat}`);
    expect(response.status).toBe(400);
  });
});
