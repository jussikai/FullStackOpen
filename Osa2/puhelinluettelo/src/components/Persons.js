import React from 'react'
import numberServices from './../services/numbers'

const Persons = (props) =>{
    const toShow = props.persons.filter(person => 
      person.name.includes(props.filter) === true)
    
    const delButton = (event) => {
      const val = parseInt(event.target.getAttribute('value'))
      console.log(props.persons)
      const obj = props.persons.filter(person => person.id === val)

      console.log(obj)
      numberServices.removeNum(obj[0])
      .then(
        numberServices
        .getAll()
        .then(response => {props.setPersons(response.data)})
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