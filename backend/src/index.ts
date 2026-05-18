import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database'
import authRoutes from './routes/auth.routes'
dotenv.config()
const app =  express()
app.use(cors())
app.use(express.json())

connectDB()
app.use('/api/auth', authRoutes)
app.get('/',(req,res)=>{
    res.json("msg: smart lead api is running ")
})


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
export default app