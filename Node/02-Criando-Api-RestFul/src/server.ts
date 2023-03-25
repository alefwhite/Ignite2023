import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {
  const tables = await knex('sqlite_schema').select('*')

  console.log(tables, 'ok 2')
})

app
  .listen({
    port: 3333,
  })
  .then((_) => console.log('HTTP SERVER REUNNING PORT: 3333'))
