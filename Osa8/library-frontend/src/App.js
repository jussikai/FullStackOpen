import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import SetBirth from './components/Setbirth'
import Loginform from './components/Loginform'
import {ALL_BOOKS,ALL_AUTHORS} from './components/queries'
import { useQuery, useMutation, useSubscription , useApolloClient} from '@apollo/react-hooks'
import {ADD_BOOK, EDIT_AUTH, LOGIN} from './components/mutations'
import {BOOK_ADDED} from './components/subsctiptions'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)

  const client = useApolloClient()

  const [editAuthor] = useMutation(EDIT_AUTH,{
    refetchQueries:[{query: ALL_AUTHORS}]
  })
  const [login] = useMutation(LOGIN)

  const updateCacheWith = (addedBook) => {
    console.log('here')
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    const authorsInStore = client.readQuery({ query: ALL_AUTHORS })
    console.log(dataInStore.allBooks)
    console.log(dataInStore)
    console.log(addedBook)
    console.log(includedIn(dataInStore.allBooks, addedBook))
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
      if(authorsInStore.allAuthors.find(author=> author.name === addedBook.author.name)){
        client.writeQuery({
          query: ALL_AUTHORS,
          data: { allAuthors : authorsInStore.allAuthors.map(author=>
            author.name===addedBook.author.name?{...author, 
              bookCount: author.bookCount +1}:author) }
        })
      }
      else(
        client.writeQuery({
          query: ALL_AUTHORS,
          data: { allAuthors : authorsInStore.allAuthors.concat({name:addedBook.author.name,
              bookCount:1, born:null, __typename: "Author"})}
        })
      )
      
      console.log('written')
    }
    console.log('over')   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`${subscriptionData.data.bookAdded.title} by 
      ${subscriptionData.data.bookAdded.author.name} added`)
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

  const [addBook] = useMutation(ADD_BOOK, {
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

  useEffect(()=>{
    const loggedUserJSON = window.localStorage.getItem('user-token')
    if (loggedUserJSON) {
      console.log(loggedUserJSON)
      setToken(loggedUserJSON)
    }
  },[])

  const logout = (event) =>{
    event.preventDefault()
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token?<><button onClick={() => setPage('add')}>add book</button>
          <button onClick={logout}>logout</button></>:
          <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors
        show={page === 'authors'}
        result = {authors}
      />
      <SetBirth
        show={page === 'authors'}
        authors = {authors}
        editAuthor = {editAuthor}
      />

      <Books 
        show={page === 'books'} 
        result = {books}
      />


      <NewBook
        show={page === 'add'}
        addBook = {addBook}
      />

      <Loginform
        show={page ==='login'}
        setToken={setToken}
        setPage={setPage}
        login = {login}
      />
    </div>
  )
}

export default App