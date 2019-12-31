import React, { useState } from 'react'
import blogServices from '../services/blogs'

const Blog = (props) => {
  const [extra, setExtra] = useState(false)

  const change = () => {
    console.log('moi')
    console.log(props.blog)
    setExtra(extra?false:true)

  }
  const vote = async (event) => {
    event.preventDefault()
    const changed = { title:props.blog.title, author:props.blog.author,
      url:props.blog.url,likes: props.blog.likes+1,id:props.blog.id }
    const newBlog = await blogServices.like(changed)
    console.log(newBlog)
    props.setBlogs(props.blogs.map(blog => blog.id===newBlog.id?newBlog:blog))


  }
  const delBlog = (event) => {
    event.preventDefault()
    try{blogServices.remove({ user:props.user.token,id:props.blog.id })
      const newBlog=props.blog
      console.log(newBlog)
      props.setBlogs(props.blogs.filter(blog => blog.id!==newBlog.id))}
    catch(exception){
      console.log('an error occurred')
    }
  }

  if(!extra){
    return(
      <div onClick={change}>
        {props.blog.title} {props.blog.author}</div>
    )
  }
  console.log(props.blog.user)
  console.log(props.user)
  return(
    <div onClick={change}>
      <div>{props.blog.title} {props.blog.author}</div>
      <div>{props.blog.url}</div>
      <div>{props.blog.likes} likes <button onClick={vote}>like</button></div>
      <div>added by {props.blog.user.username}</div>
      {props.blog.user.username===props.user.username?<button onClick={delBlog}>remove</button>:
        null}
    </div>
  )}

export default Blog