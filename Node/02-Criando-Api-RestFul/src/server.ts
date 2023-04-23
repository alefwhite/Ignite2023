import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT,
  })
  .then((_) => console.log('SERVIDOR RODANDO NA PORTA: 3333'))
