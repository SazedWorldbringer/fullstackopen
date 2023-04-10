import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

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
    const filtered = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredPersons(filtered)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleSearchChange} />
      </div>
      <form onSubmit={addName}>
        <h2>add new number</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person) => <div key={person.id}>{person.name} {person.number}</div>)}
      </div>
    </div>
  )
}

export default App
