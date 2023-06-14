const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogslist')

const app = express()

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
