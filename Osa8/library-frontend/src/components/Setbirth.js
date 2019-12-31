import React, { useState , useEffect} from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import {ALL_AUTHORS,authors} from './Authors'

const SetBirth = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  console.log(authors)
  useEffect(()=>{setTimeout(()=>setBorn(0),100)},[])
  if (!props.show) {
    return null
  }

  const EDIT_AUTH = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(
      name: $name,
      setBornTo: $setBornTo,
    ){
      name
      born
    }
  }`


  return <Mutation mutation={EDIT_AUTH}
  refetchQueries={[{query:ALL_AUTHORS}]}
  >{(editAuthor)=>{
    const submit = async (e) => {
      e.preventDefault()
  
      console.log('adit author...')
      await editAuthor({variables:{name,setBornTo:parseInt(born)}})
      setName('')
      setBorn('')
    }

    const handleChange = (event) =>{
        setName(event.target.value)
    }


  
  return (
    <div>
        <h1>Set birthyear</h1>
      <form onSubmit={submit}>
        <div>
          name
          <select value ={name}
          onChange = {handleChange}>
              {authors.map(author => <option value = {author.name}
              key = {author.name}>{author.name}</option>)}

          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )}}
  </Mutation>
}

export default SetBirth