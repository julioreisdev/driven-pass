import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'

dotenv.config()
const server = express()
server.use(cors(), express.json())

server.use(authRoutes)

const PORT: number = Number(process.env.PORT) ? Number(process.env.PORT) : 5009
server.listen(PORT, () => {
    console.log(`SERVER RUNNING IN THE PORT ${PORT}`)
})
