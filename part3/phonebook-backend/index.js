require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

const app = express()

// render frontend
app.use(express.static("dist"))

// allow cross origin requests 
app.use(cors())

// parse incoming json data
app.use(express.json())

// log request information to the console
morgan.token('data', function(req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

const errorHandler = (error, req, res, next) => {
	console.error(error.message)

	if (error.name === "CastError") {
		return res.status(400).send({ error: 'malformatted id' })
	}

	next(error)
}

let persons = [
	{
		"id": 1,
		"name": "Arto Hellas",
		"number": "040-123456"
	},
	{
		"id": 2,
		"name": "Ada Lovelace",
		"number": "39-44-5323523"
	},
	{
		"id": 3,
		"name": "Dan Abramov",
		"number": "12-43-234345"
	},
	{
		"id": 4,
		"name": "Mary Poppendieck",
		"number": "39-23-6423122"
	}
]

// Get all phonebook entries
app.get('/api/people', (req, res) => {
	Person.find({}).then(result => {
		res.json(result)
	})
})

// Info page
app.get('/info', (req, res) => {
	const entries = persons.length
	const time = new Date()[Symbol.toPrimitive]("string")

	res.send(`
		<p>Phonebook has info for ${entries} people<p>
		<p>${time}</p>
	`)
})

// Get indidual phonebook entry
app.get('/api/people/:id', (req, res) => {
	const id = Number(req.params.id)
	const person = persons.find(person => person.id === id)

	if (person) {
		res.json(person)
	} else {
		res.status(404).end()
	}
})

// Delete phonebook entry
app.delete('/api/people/:id', (req, res, next) => {
	const id = req.params.id
	// find the object by its id in parameters and remove it from the database
	Person.findByIdAndRemove(id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => next(error))
})

app.use(errorHandler)

// Add entry to the phonebook
app.post('/api/people', (req, res) => {
	const body = req.body

	if (!body.name || !body.number) {
		return res.status(400).json({
			error: "Name and number are required"
		})
	}

	const person = new Person({
		number: body.number,
		name: body.name,
	})

	person.save().then(savedPerson => {
		res.json(savedPerson)
	})
})

// Update an entry in the phonebook
app.put('/api/people/:id', (req, res, next) => {
	const body = req.body

	const person = {
		name: body.name,
		number: body.number
	}

	const id = req.params.id

	Person.findByIdAndUpdate(id, person, { new: true })
		.then(updatedPerson => {
			res.json(updatedPerson)
		})
		.catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`)
})
