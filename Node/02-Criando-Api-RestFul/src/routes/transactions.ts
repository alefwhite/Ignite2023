import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import crypto from 'node:crypto'

import { z } from 'zod'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionRoutes(app: FastifyInstance) {
  // app.addHook('preHandler', checkSessionIdExists) // middleware para todas as rotas dentro desse contexto transactionRoutes

  app.get('/', { preHandler: [checkSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies

    const transactions = await knex('transactions')
      .select()
      .where({ session_id: sessionId })

    return { transactions }
  })

  app.get('/:id', async (request) => {
    const { sessionId } = request.cookies

    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParamsSchema.parse(request.params)

    const transactions = await knex('transactions')
      .where({ id, session_id: sessionId })
      .first()

    return { transactions }
  })

  app.get('/summary', async (request) => {
    const { sessionId } = request.cookies

    const summary = await knex('transactions')
      .where({ session_id: sessionId })
      .sum('amount', { as: 'amount' })
      .first()

    return { summary }
  })

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = crypto.randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('transactions')
      .insert({
        id: crypto.randomUUID(),
        title,
        amount: type === 'credit' ? amount : amount * -1,
        session_id: sessionId,
      })
      .returning('*')

    return reply.status(201).send()
  })
}
