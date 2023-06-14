const express = require('express')
const cors = require('cors')

require('dotenv').config()

const blogsRouter = require('./controllers/blogslist')
const mongoose = require('mongoose')

const app = express()

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
