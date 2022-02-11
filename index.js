import dotenv from 'dotenv'
import app from './app'

dotenv.config()

const run = () => {
  const PORT = process.env.PORT || 8080

  app.listen(PORT, () => {
    console.log(`The server has started at ${PORT}`)
  })
}

run()
