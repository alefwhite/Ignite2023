import fastify from 'fastify'
import { env } from './env'
import { transactionRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)

app.addHook('preHandler', async (request) => {
  console.log(`[${request.method}] [${request.url}]`)
}) // middleware global para todas rotas que vierem abaixo

app.register(transactionRoutes, {
  prefix: 'transactions',
})

app
  .listen({
    port: env.PORT,
  })
  .then((_) => console.log('HTTP SERVER REUNNING PORT: 3333'))
