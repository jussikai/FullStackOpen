import React from 'react'
import './App.css'
import { useEffect, useState } from 'react'
import blogService from './services/blogs.js'
import loginService from './services/login.js'
import showProfile from './components/Showprofile.js'
import PropTypes from 'prop-types'

const loginForm = (props) => (
  <div>
    <h1>log in to application</h1>
    <form onSubmit={props.handleLogin}>
      <div>
    username
        <input
          type="text"
          value={props.username}
          name="Username"
          onChange={({ target }) => props.setUsername(target.value)}
        />
      </div>
      <div>
    password
        <input
          type="password"
          value={props.password}
          name="Password"
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)


loginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
}

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [showForm,setVis] = useState(false)
  const [extra, setExtra] = useState('')

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




  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setNotification('wrong username or password')
      setTimeout(() => setNotification(null),3000)


    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedNoteappUser')
  }
  const loginVars = { username:username,password:password,setUsername:setUsername,
    setPassword:setPassword,handleLogin:handleLogin }

  return (
    <div className="App">
      {notification?<message>{notification}</message>:null}
      {user === null ?
        loginForm(loginVars) :
        showProfile(user,blogs,handleLogout,setBlogs,setNotification,showForm,setVis,extra,setExtra)
      }

    </div>
  )
}

export default App
