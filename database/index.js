import mongoose from 'mongoose'

const getConnectionURL = () => {
  const connectionURL = process.env.CONNECTION_URL
  if (connectionURL && connectionURL.length > 0) return connectionURL

  let url = 'mongodb://'
  const { HOST, USERNAME = '', PASSWORD = '', DATABASE = '' } = process.env

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

  return url
}

const createConnection = async () => {
  const connectionURL = getConnectionURL()
  let connection
  try {
    connection = await mongoose.connect(connectionURL)
  } catch (err) {
    throw Error(err.message)
  }

  return connection
}

export default createConnection
