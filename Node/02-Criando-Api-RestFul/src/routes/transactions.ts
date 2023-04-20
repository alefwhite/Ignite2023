import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import crypto from 'node:crypto'

import { z } from 'zod'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

/** nvm
 *  Unitários: unidade da sua aplicação
 *  Integração: comunicação entre duas ou mais unidades
 *  E2E: ponta a ponta: simulam um usuário operando na nossa aplicação *
 */

// front-end: abre a página de login, digite o teto alefwhite@gmail.com no com ID email, clique no botão
//  back-end: chamadas HTTP: WebSockets

// Pirâmide de testes: E2E (não dependem de nenhuma tecnologia,  não dependem de arquitetura)
// 2000 testes -> Testes E2E => 16min

export async function transactionRoutes(app: FastifyInstance) {
  // app.addHook('preHandler', checkSessionIdExists) // middleware para todas as rotas dentro desse contexto transactionRoutes

  app.get('/', { preHandler: [checkSessionIdExists] }, async (request) => {
    const newObj = structuredClone(request.cookies)

    const { sessionId } = newObj

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
