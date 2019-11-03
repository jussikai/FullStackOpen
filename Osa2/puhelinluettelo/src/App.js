import React, { useState } from 'react'
import PersonForm from './components/Personform'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter ] = useState('')

  

  const handleNoteChange = (event) => setNewName(event.target.value)
  const handleNumChange = (event) => setNewNum(event.target.value)
  const handleFilChange = (event) => setFilter(event.target.value)



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilChange = {handleFilChange} filter = {filter}/>
      <h2>add a new</h2>
      <PersonForm newName = {newName} handleNumChange= {handleNumChange} newNum = {newNum}
      handleNoteChange = {handleNoteChange} persons = {persons} setPersons = {setPersons}
      setNewName = {setNewName} setNewNum = {setNewNum}/>
      <h2>Numbers</h2>
      <Persons persons = {persons} filter = {filter}/>

    </div>
  )

}

export default App