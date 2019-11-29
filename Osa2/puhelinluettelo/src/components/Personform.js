import React from 'react'
import numberServices from './../services/numbers'

const PersonForm = (props) =>{
    const addNumber = (event) => {
      event.preventDefault()
      console.log(props.newName)
      console.log(props.persons)
      if (!(props.persons.some(person => person.name === props.newName))){    
          numberServices.create({name: props.newName, number: props.newNum})
      }
      else{
          if (window.confirm(`${props.newName} is already in the phonebook, replace the old number with a new one?`)){
            console.log(props.persons.filter(
              person => person.name ===props.newName)[0]
              .id)
            numberServices.update(props.persons.filter(
              person => person.name ===props.newName)[0]
              .id, {name: props.newName, 
                number: props.newNum, 
                id: props.persons.filter(person => person.name ===props.newName)[0].id}
                )
          }
      }
      props.setNewName('')
      props.setNewNum('')
      numberServices
      .getAll()
      .then(response => {props.setPersons(response.data)})
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