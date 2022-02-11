import express from 'express'
import dotenv from 'dotenv'
import server from './graphql'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

server.start().then(() => {
  server.applyMiddleware({ app })

  app.listen(PORT, () => {
    console.log(`The server has started at ${PORT}`)
  })
})

export default app
