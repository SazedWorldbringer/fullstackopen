import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
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

    const newPerson = { name: newName, number: newNumber }

    if (containsObj(newPerson, persons)) return;

    const updatedPersons = [
      ...persons,
      newPerson,
    ]

    setPersons(updatedPersons);
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
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
        {persons.map((person, idx) => <div key={idx}>{person.name} {person.number}</div>)}
      </div>
    </div>
  )
}

export default App
