import React from 'react'
import numberServices from './../services/numbers'

const Persons = (props) =>{
    const toShow = props.persons.filter(person => 
      person.name.toLowerCase().includes(props.filter.toLowerCase()) === true)
    
    const delButton = (event) => {
      const val = parseInt(event.target.getAttribute('value'))
      const obj = props.persons.filter(person => person.id === val)

      console.log(obj)
      numberServices.removeNum(obj[0])
      .then(()=>
        numberServices
        .getAll()
        .then(response => {props.setPersons(response.data)})
        ,props.setMessage(`Removed ${obj[0].name}`)
        ,setTimeout(() => {
          props.setMessage(null)
        }, 3000)
        )
        .catch((error) =>{
          props.setMessage(null)
          props.setErrorMessage(`Information of ${obj[0].name} has already been removed from server`)
          setTimeout(() => {
            props.setErrorMessage(null)
          }, 3000)
          numberServices
          .getAll()
          .then(response => {props.setPersons(response.data)})
          }
        )

    
    } 
    
    const Note = ({person}) => 
    <li key = {person.name}>{person.name} {person.number}
    <button value={person.id} onClick ={delButton}>
      delete</button></li>
  
    const rows = () => toShow.map(person => 
      <Note key = {person.name} person = {person}/>)
  
    return(
      <ul>
      {rows()}
      </ul>
    )
  
  }

  export default Persons