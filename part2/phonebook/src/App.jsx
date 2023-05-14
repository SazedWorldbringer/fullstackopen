import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
        setFilteredPersons(initialPersons);
      })
  }, [persons])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  // Check if the persons array contains new person
  const containsPerson = (persons, person) => {
    for (let i = 0; i < persons.length; i++) {
      // If any person's name in the array matches new person's name,
      // but the number doesn't match
      // update the person's number and return
      if (persons[i].name.toLowerCase() === person.name.toLowerCase()) {
        if (persons[i].number !== person.number) {
          const updateTheNumber = updateNumber(person, persons[i].id)
          if (updateTheNumber) return true
        }
        // If the user doesn't want to update the number, clear input values and return
        window.alert(`${person.name} is already added to the phonebook`)
        setNewName('')
        setNewNumber('')
        return true
      }
    }
    // return false if none of the conditions match
    return false
  }

  const addName = (event) => {
    event.preventDefault();

    // check if the input is valid
    if (newName === '' || newNumber === '') {
      window.alert("Name and number cannot be empty.")
      return
    }

    const newPerson = { id: persons.length + 1, name: newName, number: newNumber }

    // check if the person is already in the persons array + update the number
    if (containsPerson(persons, newPerson)) return;

    // Create a new person if one isn't already present
    personService
      .create(newPerson)
      .then(returnedPerson => {
        // update persons array
        setPersons(persons.concat(returnedPerson));
        setFilteredPersons(filteredPersons.concat(returnedPerson));
      })

    // clear input values
    setNewName('');
    setNewNumber('');
  }

  const deleteName = (id) => {
    if (!window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) return;

    // delete person with given id
    personService.deleteName(id)

    // update persons array
    setPersons(persons.filter(person => person.id !== id))
    setFilteredPersons(persons.filter(person => person.id !== id))
  }

  const updateNumber = (obj, id) => {
    if (!window.confirm(`${obj.name} is already added to the phonebook, replace the old number with a new number?`)) return

    // update person with given id
    personService
      .update(id, obj)
      .then(returnedPerson => {
        // update persons array
        setPersons(persons.filter(person => person.id !== id ? person : returnedPerson))
        setFilteredPersons(persons.filter(person => person.id !== id ? person : returnedPerson))
      })

    // clear input values
    setNewName('')
    setNewNumber('')
    return true
  }

  const handleSearchChange = (event) => {
    // filter the person array so that it contains persons with names matching the input value
    const filtered = persons.filter(
      person => person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredPersons(filtered);
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter handleChange={handleSearchChange} />

      <h3>Add a new number</h3>
      <PersonForm handleSubmit={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />

      <h3>Numbers</h3>
      <Persons handleDelete={deleteName} persons={filteredPersons} />
    </div>
  )
}

export default App
