import express from 'express'
import dotenv from 'dotenv'
import server from './graphql'
import createConnection from './database'

const run = async () => {
  dotenv.config()

  const app = express()
  const PORT = process.env.PORT || 3001
  try {
    await createConnection()

    server.start().then(() => {
      server.applyMiddleware({ app })

      app.listen(PORT, () => {
        console.log(`The server has started at ${PORT}`)
      })
    })
  } catch (err) {
    console.log('Error establishing a database connection : ', err.message)
  }
}

run()
