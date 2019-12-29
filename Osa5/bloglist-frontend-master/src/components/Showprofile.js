import BlogForm from './Blogform'
import React from 'react'

import Blog from './Blog'

const showProfile = (user,blogs,handleLogout, setBlogs, setNotification,showForm,setVis) => {
  console.log('start')


  const togglevis = (event) => {
    event.preventDefault()
    setVis(showForm?false:true)}

  //const userblogs = blogs.filter(blog=> blog.user.username===user.username)
  const userblogs = blogs
  return(
    <div>
      <h1>blogs</h1>
      <p>{user.name?user.name:user.username} logged in 
      <button onClick={handleLogout}>logout</button></p>

      {showForm?
      <div><BlogForm user = {user} 
        blogs = {blogs} 
        setBlogs = {setBlogs}
        setNotification = {setNotification} 
        setVis={togglevis} />
        <button onClick={togglevis}>cancel</button>
      </div>:
      <button onClick={togglevis}>new note</button>}

      {userblogs?
      <div>{userblogs
        .sort((b,a) => a.likes-b.likes)
        .map(blog => <Blog key={blog.id}
            blog={blog} 
            blogs={blogs} 
            setBlogs={setBlogs} 
            user = {user}
            />)}</div>:null}


    </div>

  )}
export default showProfile