import React, { useState } from 'react'
import blogServices from '../services/blogs'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleSubmit = async (event) => {
    event.preventDefault()
    try{const newBlog = await blogServices.add({ user:props.user, blog:{ title: title,
      author: author, url:url } })
    console.log(newBlog)
    props.setBlogs(props.blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    props.setNotification(`a new blog ${newBlog.title} added`)
    setTimeout(() => props.setNotification(null),3000)}
    catch(exception){
      props.setNotification('an error occurred')
      setTimeout(() => props.setNotification(null),3000)
    }


  }

  return <div>
    <h1>create new</h1>
    <form onSubmit = {handleSubmit}>
      <div>title: <input value = {title}
        name= 'title'
        onChange={({ target }) => setTitle(target.value)}
      /></div>
      <div>author: <input value = {author}
        name= 'author'
        onChange={({ target }) => setAuthor(target.value)}
      /></div>
      <div>url: <input value = {url}
        name= 'url'
        onChange={({ target }) => setUrl(target.value)}
      /></div>
      <button type="submit">create</button>
    </form>
  </div>
}

export default BlogForm