import BlogForm from './Blogform'
import React from 'react'
import blogServices from '../services/blogs'

const showProfile = (user,blogs,handleLogout, setBlogs, setNotification,showForm,setVis,extra, setExtra) => {
  console.log('start')
  console.log(extra)
  const Blog = (blog) => {

    const change = () => {
      console.log('moi')
      console.log(blog)
      setExtra(blog.blog.id)

    }
    return(
      <div onClick={change}>
        {blog.blog.title} {blog.blog.author}</div>
    )}

  const ShowMore = (blog) => {
    const change = () => {
      console.log('moi')
      setExtra('')
    }
    const vote = async (event) => {
      event.preventDefault()
      const changed = { title:blog.blog.title, author:blog.blog.author,
        url:blog.blog.url,likes: blog.blog.likes+1,id:blog.blog.id }
      const newBlog = await blogServices.like(changed)
      console.log(newBlog)
      console.log(blog)
      setBlogs(blogs.map(blog => blog.id===newBlog.id?newBlog:blog))

      console.log(blogs)

    }
    const delBlog = (event) => {
      event.preventDefault()
      console.log(blog)
      try{console.log(blogServices.remove({ user:user.token,id:blog.blog.id }))
        const newBlog=blog.blog
        setBlogs(blogs.filter(blog => blog.id!==newBlog.id))}
      catch(exception){
        console.log('an error occurred')
      }
    }
    return(
      <div onClick={change}>
        <div>{blog.blog.title} {blog.blog.author}</div>
        <div>{blog.blog.url}</div>
        <div>{blog.blog.likes} likes <button onClick={vote}>like</button></div>
        <div>added by {blog.blog.user.username}</div>
        {blog.blog.user.username===user.username?<button onClick={delBlog}>remove</button>:
          null}
      </div>
    )}

  const togglevis = (event) => {
    event.preventDefault()
    setVis(showForm?false:true)}

  //const userblogs = blogs.filter(blog=> blog.user.username===user.username)
  const userblogs = blogs
  return(
    <div>
      <h1>blogs</h1>
      <p>{user.name?user.name:user.username} logged in <button onClick={handleLogout}>logout</button></p>
      {showForm?<div><BlogForm user = {user} blogs = {blogs} setBlogs = {setBlogs}
        setNotification = {setNotification} setVis={togglevis} /><button onClick={togglevis}>cancel</button>
      </div>:<button onClick={togglevis}>new note</button>}
      {userblogs?<div>{userblogs.sort((b,a) => a.likes-b.likes).map(blog => blog.id===extra?<ShowMore key={blog._id} blog={blog}/>:
        <Blog key={blog._id} blog={blog}/>)}</div>:null}


    </div>

  )}
export default showProfile