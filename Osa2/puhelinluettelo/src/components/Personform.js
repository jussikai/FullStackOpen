import React, { useState } from 'react'

const PersonForm = (props) =>{
    const addNumber = (event) => {
      event.preventDefault()
      console.log(props.newName)
      console.log(props.persons)
      if (!(props.persons.some(person => person.name === props.newName))){    
          props.setPersons(props.persons.concat({name: props.newName, number: props.newNum}))
      }
      else{
          window.alert(`${props.newName} is already in the phonebook`)
      }
      props.setNewName('')
      props.setNewNum('')
    }
  
    
    return(
      <form onSubmit = {addNumber}>
  
      <div>name: <input 
      onChange = {props.handleNoteChange} 
      value = {props.newName} /></div>
  
      <div>number: <input 
      onChange = {props.handleNumChange} 
      value = {props.newNum}/></div>
      <div><button type="submit">add</button></div>
    </form>
    )
  }

  export default PersonForm