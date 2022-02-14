import express from 'express'
import dotenv from 'dotenv'
import server from './src/graphql/index.js'
import createConnection from './src/database/index.js'
import processDocumentsData from './src/database/seeding.js'
import runCronJobs from './src/schedulers/cron.js'
import getConfig from './src/config/index.js'

const run = async () => {
  dotenv.config()

  const app = express()
  const { PORT } = getConfig()
  try {
    await createConnection()

    server.start().then(() => {
      server.applyMiddleware({ app })

      /**
       * Giving this End point to Manually Trigger the Data Seeding where
       * it checks the URLs and save/modify data to mongodb
       */

      app.get('/dataseed', async (req, res) => {
        await processDocumentsData()
        res.send('Data Seeding is triggered!')
      })

      app.listen(PORT, () => {
        console.log(`The server has started at ${PORT}`)
      })

      // Runs all the scheduled cron jobs
      runCronJobs()
    })
  } catch (err) {
    console.log('Error establishing a database connection : ', err.message)
  }
}

run()
