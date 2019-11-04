import React from 'react'

const Persons = (props) =>{
    const toShow = props.persons.filter(person => 
      person.name.includes(props.filter) === true)
    
    const Note = ({person}) => 
    <li key = {person.name}>{person.name} {person.number}</li>
  
    const rows = () => toShow.map(person => 
      <Note key = {person.name} person = {person}/>)
  
    return(
      <ul>
      {rows()}
      </ul>
    )
  
  }

  export default Persons