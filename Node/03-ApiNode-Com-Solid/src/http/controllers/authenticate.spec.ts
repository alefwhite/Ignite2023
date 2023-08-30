import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '@/app';

// @ts-ignore
describe('Authenticate (e2)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {
    const email = 'britto_romero@ig.com.br';
    const password = '123456';

    await request(app.server).post('/users').send({
      name: 'Romero Britto',
      email,
      password,
    });

    const response = await request(app.server).post('/sessions').send({
      email,
      password,
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
