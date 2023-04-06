import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const containsObj = (obj, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name.toLowerCase() === obj.name.toLowerCase()) {
        window.alert(`${obj.name} is already added to the phonebook`)
        setNewName('')
        return true;
      }
    }
    return false
  }

  const addName = (event) => {
    event.preventDefault();

    const newPerson = { name: newName }

    if (containsObj(newPerson, persons)) return;

    const updatedPersons = [
      ...persons,
      newPerson,
    ]

    setPersons(updatedPersons);
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, idx) => <div key={idx}>{person.name}</div>)}
      </div>
    </div>
  )
}

export default App
