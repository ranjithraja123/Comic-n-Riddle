import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import comicRoutes from './routes/comic.routes.js'
import userRoutes from './routes/user.routes.js'
import PageRoutes from './routes/episodes.routes.js'


dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/comics',comicRoutes)
app.use('/api/comicsPages',PageRoutes)


app.get("/",(req,res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    connectDB()
    console.log(`server on Port ${PORT}`)
})