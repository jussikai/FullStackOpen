import React from 'react'
import './App.css'
import { useEffect, useState } from 'react'
import blogService from './services/blogs.js'

import showProfile from './components/Showprofile.js'
import Loginform from './components/Loginform'




function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [showForm,setVis] = useState(false)

  useEffect(() => {
    blogService
      .getAll().then(initialblogs => {
        setBlogs(initialblogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedNoteappUser')
  }

  return (
    <div className="App">
      {notification?<div>{notification}</div>:null}
      {user === null ?
        <Loginform setNotification={setNotification} setUser={setUser} /> :
        showProfile(user,blogs,handleLogout,setBlogs,setNotification,showForm,setVis)
      }

    </div>
  )
}

export default App
