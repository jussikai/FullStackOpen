import React, { useState, useEffect } from 'react'
import PersonForm from './components/Personform'
import Filter from './components/Filter'
import Persons from './components/Persons'
import numberService from './services/numbers'
import Notification from './components/Notification'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [Message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  
  useEffect(() => {
    numberService
    .getAll()
    .then(response => {setPersons(response.data)})
  }, [])
  

  const handleNoteChange = (event) => setNewName(event.target.value)
  const handleNumChange = (event) => setNewNum(event.target.value)
  const handleFilChange = (event) => setFilter(event.target.value)



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification.Errormsg message = {errorMessage}/>
      <Notification.Notification message = {Message}/>
      <Filter handleFilChange = {handleFilChange} filter = {filter}/>
      <h2>add a new</h2>
      <PersonForm newName = {newName} handleNumChange= {handleNumChange} newNum = {newNum}
      handleNoteChange = {handleNoteChange} persons = {persons} setPersons = {setPersons}
      setNewName = {setNewName} setNewNum = {setNewNum} setMessage = {setMessage}
      setErrorMessage = {setErrorMessage}/>
      <h2>Numbers</h2>
      <Persons persons = {persons} filter = {filter} setPersons={setPersons} 
      setMessage = {setMessage} setErrorMessage = {setErrorMessage}/>

    </div>
  )

}

export default App