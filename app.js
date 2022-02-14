import express from 'express'
import dotenv from 'dotenv'
import server from './graphql/index.js'
import createConnection from './database/index.js'

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
