import { test, beforeAll, afterAll, describe, it } from 'vitest'
import Request from 'supertest'
import { app } from '../src/app'

describe('Transaction routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  // test e it fazem a mesma a coisa o que muda é a questão da semântica

  test('user can create a new transaction', async () => {
    await Request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 500,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to create a new transaction', async () => {
    await Request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 500,
        type: 'credit',
      })
      .expect(201)
  })
})
