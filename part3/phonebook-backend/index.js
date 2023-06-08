require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

const app = express()

// parse incoming json data
app.use(express.json())

// log request information to the console
morgan.token('data', function(req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

// allow cross origin requests 
app.use(cors())

// render frontend
app.use(express.static("dist"))

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
app.delete('/api/people/:id', (req, res) => {
	const id = req.params.id
	// find the object by its id in parameters and remove it from the database
	Person.findByIdAndRemove(id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => console.log(error))
})

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

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`)
})
