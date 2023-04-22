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
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const containsObj = (obj, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name.toLowerCase() === obj.name.toLowerCase()) {
        window.alert(`${obj.name} is already added to the phonebook`)
        setNewName('')
        setNewNumber('')
        return true;
      }
    }
    return false
  }

  const addName = (event) => {
    event.preventDefault();

    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }

    if (containsObj(newPerson, persons)) return;

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setFilteredPersons(filteredPersons.concat(returnedPerson));
      })

    setNewName('');
    setNewNumber('');
  }

  const deleteName = (id) => {
    if (!window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) return;

    personService.deleteName(id)

    setPersons(persons.filter(person => person.id !== id))
    setFilteredPersons(persons.filter(person => person.id !== id))
  }

  const handleSearchChange = (event) => {
    const filtered = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setFilteredPersons(filtered);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleChange={handleSearchChange} />

      <h3>Add a new number</h3>
      <PersonForm handleSubmit={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />

      <h3>Numbers</h3>
      <Persons handleDelete={deleteName} persons={filteredPersons} />
    </div>
  )
}

export default App
