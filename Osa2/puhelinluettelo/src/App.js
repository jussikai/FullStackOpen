import React, { useState } from 'react'


const Note = ({person}) => <li key = {person.name}>{person.name} {person.number}</li>
const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter ] = useState('')
  
  
  const addNumber = (event) => {
    event.preventDefault()
    console.log(newName)
    console.log(persons)
    if (!(persons.some(person => person.name === newName))){    
        setPersons(persons.concat({name: newName, number: newNum}))
    }
    else{
        window.alert(`${newName} is already in the phonebook`)
    }
    setNewName('')
    setNewNum('')
}

  const toShow = persons.filter(person => person.name.includes(filter) === true)



  const handleNoteChange = (event) => setNewName(event.target.value)
  const handleNumChange = (event) => setNewNum(event.target.value)
  const handleFilChange = (event) => setFilter(event.target.value)

  const rows = () => toShow.map(person => 
    <Note key = {person.name} person = {person}/>)


  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with<input 
      onChange = {handleFilChange} 
      value = {filter} /></div>

      <h2>add a new</h2>
      <form onSubmit = {addNumber}>

          <div>name: <input 
          onChange = {handleNoteChange} 
          value = {newName} /></div>

          <div>number: <input 
          onChange = {handleNumChange} 
          value = {newNum}/></div>
          <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
          {rows()}
      </ul>
    </div>
  )

}

export default App