import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT,
  })
  .then((_) => console.log('HTTP SERVER REUNNING PORT: 3333'))
