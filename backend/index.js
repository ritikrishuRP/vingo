import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cokieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './config/db.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'

const app = express()
const port = process.env.PORT || 5000

app.use(cors({
   origin: 'http://localhost:5173',
    credentials: true 
}))
app.use(express.json())
app.use(cokieParser())
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)


app.listen(port, ()=>{
    connectDB()
    console.log(`Server is running on port ${port}`)
})