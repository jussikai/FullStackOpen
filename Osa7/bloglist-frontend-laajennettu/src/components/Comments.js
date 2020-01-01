import React from 'react'
import {useField} from '../hooks'
import {commentBlog} from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'

const Comment = (props) =>{
  const {reset:commentreset, ...comment} = useField('text')

  const handleSubmit = (event) =>{
    event.preventDefault()
    props.commentBlog(props.blog.id,comment.value)
    commentreset()
  }

  return(
    <div>
      <h3>comments</h3>
      <Form onSubmit = {handleSubmit}>
        <div><input {...comment}/>
          <Button type="submit">add comment</Button></div>
      </Form>
      <ul>
        {props.blog.comments.map(comment=><li key = {comment}>{comment}</li>)}
      </ul>
    </div>
  )

}

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  return {
    blogs: state.blogs,
    user: state.user
  }
}
  
const mapDispatchToProps = {
  commentBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)