import fastify from 'fastify'
import { transactionRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(cookie)

app.addHook('preHandler', async (request) => {
  console.log(`[${request.method}] [${request.url}]`)
}) // middleware global para todas rotas que vierem abaixo

app.register(transactionRoutes, {
  prefix: 'transactions',
})
