const express = require('express')
const cors = require('cors')

const config = require('./utils/config')

const blogsRouter = require('./controllers/blogslist')
const usersRouter = require('./controllers/users');
const mongoose = require('mongoose')

const app = express()

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app
