import React from 'react';
import './App.css';
import {useEffect, useState} from 'react';
import blogService from './services/blogs.js';
import loginService from './services/login.js';

const loginForm = (props) =>(
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

const showProfile = (user,blogs,handleLogout) =>{
  const Blog = (blog) =>(
    <li key={blog.blog._id}>{blog.blog.title} {blog.blog.author}</li>
  )
  
  
  console.log(user)
  console.log(blogs)
  //const userblogs = blogs.filter(blog=> blog.user.username===user.username)
  const userblogs = blogs
  console.log(userblogs)
  return(
  <div>
  <h1>blogs</h1>
  <p>{user.name?user.name:user.username} logged in <button onClick={handleLogout}>logout</button></p>
  {userblogs?<ul>{userblogs.map(blog => <Blog blog={blog}/>)}</ul>:null}
  </div>
)}


function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

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

    }
  }

  const handleLogout = async (event) =>{
    setUser(null)
    window.localStorage.removeItem('loggedNoteappUser')
  }
  const loginVars = {username:username,password:password,setUsername:setUsername,
    setPassword:setPassword,handleLogin:handleLogin}

  return (
    <div className="App">
      {user === null ?
      loginForm(loginVars) :
      showProfile(user,blogs,handleLogout)
    }

    </div>
  );
}

export default App;
