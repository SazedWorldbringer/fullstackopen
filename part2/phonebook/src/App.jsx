import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
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

    const updatedPersons = [
      ...persons,
      newPerson,
    ]

    setPersons(updatedPersons);
    setFilteredPersons(updatedPersons)
    setNewName('');
    setNewNumber('');
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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App