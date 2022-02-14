import dotenv from 'dotenv'

dotenv.config()

const getConfig = () => {
  const returnData = {}
  const {
    HOST,
    PORT = 3001,
    APP_ENV = 'development',
    USERNAME = '',
    PASSWORD = '',
    DATABASE = '',
    CONNECTION_URL,
    SCHEDULER_FREQUENCY
  } = process.env

  if (CONNECTION_URL && CONNECTION_URL.length > 0) {
    returnData.connectionURL = CONNECTION_URL
  } else {
    let url = 'mongodb://'

    if (USERNAME.length > 0) {
      url += USERNAME
      if (PASSWORD.length > 0) {
        url += `:${PASSWORD}@`
      }
    }

    url += `${HOST}/`
    if (DATABASE.length > 0) {
      url += DATABASE
    }
    url += '?directConnection=true&serverSelectionTimeoutMS=2000'
    returnData.connectionURL = url
  }
  let schedulerFreq = ''

  if (SCHEDULER_FREQUENCY) {
    switch (SCHEDULER_FREQUENCY) {
      case 'EVERY_MONTH':
        schedulerFreq = '0 0 1 * *'
        break
      case 'EVERY_DAY':
        schedulerFreq = '0 0 * * *'
        break
      case 'EVERY_MINUTE':
        schedulerFreq = '* * * * *'
        break
      default:
        schedulerFreq = '0 0 * * *'
    }
  } else {
    schedulerFreq = '0 0 * * *'
  }
  returnData.schedulerFreq = schedulerFreq

  return { ...returnData, PORT, APP_ENV }
}

export default getConfig
