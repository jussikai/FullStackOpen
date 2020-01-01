import React from 'react'
import {likeBlog, removeBlog} from '../reducers/blogReducer'
import { connect } from 'react-redux'
import Comments from './Comments'
import {withRouter} from 'react-router-dom'
import {setNotification} from '../reducers/notificationReducer'
import { Button, Label } from 'semantic-ui-react'

const BlogNoHistory = (props) => {
  const blog = props.blogs.find(blog => blog.id === props.id)

  if(blog === undefined){
    return null
  }

  const vote = async (event) => {
    event.preventDefault()
    props.likeBlog(blog.id, props.blogs)
  }
  const delBlog = (event) => {
    event.preventDefault()
    props.removeBlog(blog.id,props.user)
    props.history.push('/blogs')
    props.setNotification(`${blog.title} deleted`,5)
  }
  
  return(
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <Button href={`https://${blog.url}`}>{blog.url}</Button>
      <div>{blog.likes} likes <Button onClick={vote}>like</Button></div>
      <div>added by <Label circular>{blog.user.username}</Label></div>
      {blog.user.username===props.user.username?<Button onClick={delBlog}>remove</Button>:
        null}
      {blog.comments?
        <Comments blog = {blog}/>:null}
    </div>
  )}

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  return {
    blogs: state.blogs,
    user: state.user
  }
}
const Blog = withRouter(BlogNoHistory)

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)