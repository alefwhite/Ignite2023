import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '@/app';

// @ts-ignore
describe('Register (e2)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Romero Britto',
      email: 'britto_romero@ig.com.br',
      password: '123456',
    });

    expect(response.statusCode).toEqual(201);
  });
});
