import React from 'react'
import {useField} from '../hooks'
import { connect } from 'react-redux'
import {createBlog} from '../reducers/blogReducer'
import {initializeUserList} from '../reducers/userlistReducer'
import { Form, Button } from 'semantic-ui-react'

const BlogForm = (props) => {
  const {reset:titlereset, ...title} = useField('text')
  const {reset:authorreset, ...author} = useField('text')
  const {reset:urlreset, ...url} = useField('text')
    
  const handleSubmit = async (event) => {
    event.preventDefault()
    props.createBlog(props.user,{ title: title.value,
      author: author.value, url:url.value } )
    titlereset()
    authorreset()
    urlreset()
    props.initializeUserList()}




  return <div>
    <h1>create new</h1>
    <Form onSubmit = {handleSubmit}>
      <div>title: <input {...title}
      /></div>
      <div>author: <input {...author}
      /></div>
      <div>url: <input {...url}
      /></div>
      <Button type="submit">create</Button>
    </Form>
  </div>
}

const mapDispatchToProps = {
  createBlog,
  initializeUserList
}

export default connect(
  null,
  mapDispatchToProps
)(BlogForm)