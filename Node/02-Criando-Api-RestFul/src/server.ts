import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
  const transaction = await knex('transaction')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transaction test',
      amount: 1000,
    })
    .returning('*')

  return transaction
})

app
  .listen({
    port: env.PORT,
  })
  .then((_) => console.log('HTTP SERVER REUNNING PORT: 3333'))
