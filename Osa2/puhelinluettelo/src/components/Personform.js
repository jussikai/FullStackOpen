import React from 'react'
import numberServices from './../services/numbers'

const PersonForm = (props) =>{
    const addNumber = (event) => {
      event.preventDefault()
      if (!(props.persons.some(person => person.name === props.newName))){    
          numberServices.create({name: props.newName, number: props.newNum}).then(()=>
            numberServices
            .getAll()
            .then(response => {props.setPersons(response.data)})
          )
          props.setMessage(`Added ${props.newName}`)
          setTimeout(() => {
            props.setMessage(null)
          }, 3000)
      }
      else{
          if (window.confirm(`${props.newName} is already in the phonebook, replace the old number with a new one?`)){
            numberServices.update(props.persons.filter(
              person => person.name ===props.newName)[0]
              .id, {name: props.newName, 
                number: props.newNum, 
                id: props.persons.filter(person => person.name ===props.newName)[0].id}
                ).then(() =>
                  numberServices
                  .getAll()
                  .then(response => {props.setPersons(response.data)})
                  ,props.setMessage(`Updated ${props.newName}`)
                  ,setTimeout(() => {
                    props.setMessage(null)
                  }, 3000)
                ).catch((error) =>{
                  props.setMessage(null)
                  props.setErrorMessage(`Information of ${props.newName} has already been removed from server`)
                  setTimeout(() => {
                    props.setErrorMessage(null)
                  }, 3000)
                  numberServices
                  .getAll()
                  .then(response => {props.setPersons(response.data)})}
                )

          }
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