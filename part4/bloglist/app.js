const express = require('express')
const cors = require('cors')

const config = require('./utils/config')

const blogsRouter = require('./controllers/blogslist')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app