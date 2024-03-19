import request from 'supertest';
import { boot } from '../..';
import { App } from '../../app';

let application: App;

beforeAll(async () => {
  const { app } = await boot;
  application = app;
});

describe('e2e todos', () => {
  it('create todo with name length 0 - error', async () => {
    const res = await request(application.app)
      .post('/todos/createTodo')
      .send({ name: '', description: '' });
    expect(res.statusCode).toBe(400);
  });

  it('create todo with name length that is bigger than allowed - error', async () => {
    const res = await request(application.app)
      .post('/todos/createTodo')
      .send({ name: 'a'.repeat(251), description: 'error' });
    expect(res.statusCode).toBe(400);
  });
});

afterAll(() => {
  application.close();
});
