import mongoose from 'mongoose'
import getConfig from '../config/index.js'

const createConnection = async () => {
  const { connectionURL } = getConfig()
  let connection
  try {
    connection = await mongoose.connect(connectionURL)
  } catch (err) {
    throw Error(err.message)
  }

  return connection
}

export default createConnection
