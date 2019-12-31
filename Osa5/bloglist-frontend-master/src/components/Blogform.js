import React from 'react'
import blogServices from '../services/blogs'
import {useField} from '../hooks'

const BlogForm = (props) => {
    const {reset:titlereset, ...title} = useField('text')
    const {reset:authorreset, ...author} = useField('text')
    const {reset:urlreset, ...url} = useField('text')
    
    const handleSubmit = async (event) => {
    event.preventDefault()
    try{const newBlog = await blogServices.add({ user:props.user, blog:{ title: title.value,
      author: author.value, url:url.value } })
    console.log(newBlog)
    props.setBlogs(props.blogs.concat({...newBlog, user:{username:props.user.username}}))
    props.setNotification(`a new blog ${newBlog.title} added`)
    titlereset()
    authorreset()
    urlreset()
    setTimeout(() => props.setNotification(null),3000)}
    catch(exception){
      props.setNotification('an error occurred')
      setTimeout(() => props.setNotification(null),3000)
    }


  }

  return <div>
    <h1>create new</h1>
    <form onSubmit = {handleSubmit}>
      <div>title: <input {...title}
      /></div>
      <div>author: <input {...author}
      /></div>
      <div>url: <input {...url}
      /></div>
      <button type="submit">create</button>
    </form>
  </div>
}

export default BlogForm