import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import {ALL_AUTHORS} from './Authors'
import {ALL_BOOKS} from './Books'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ){
      title
      author
      published
      genres
    }
  }`


  return <Mutation mutation={ADD_BOOK}
  refetchQueries={[{query:ALL_BOOKS},{query:ALL_AUTHORS}]}
  >{(addBook)=>{
    const submit = async (e) => {
      e.preventDefault()
  
      console.log('add book...')
      console.log(parseInt(published))
      await addBook({variables:{title,author,published:parseInt(published),genres}})
  
      setTitle('')
      setPublished('')
      setAuhtor('')
      setGenres([])
      setGenre('')
    }
  
    const addGenre = () => {
      setGenres(genres.concat(genre))
      setGenre('')}
  
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )}}
  </Mutation>
}

export default NewBook