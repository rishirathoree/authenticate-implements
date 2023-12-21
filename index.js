import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRouter from './Routes/User.js'

const app = express()

app.use(express.json())

mongoose.connect('mongodb+srv://tanishkapatil295:tanishkapatil295@cluster0.lu7mq9v.mongodb.net/authentication?retryWrites=true&w=majority').then(()=>{console.log('mongoose connected')}).catch((err)=>{console.log(err)})

app.use('/auth',authRouter)

app.use(cors())

app.listen(8000,()=>{console.log('server connected!!')})