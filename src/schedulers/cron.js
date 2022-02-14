import cron from 'node-cron'
import processDocumentsData from '../database/seeding.js'
import getCongif from '../config/index.js'

const runCronJobs = () => {
  const { schedulerFreq } = getCongif()
  cron.schedule(schedulerFreq, async () => {
    await processDocumentsData()
  })
}

export default runCronJobs
