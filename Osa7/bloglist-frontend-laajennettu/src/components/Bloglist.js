import BlogForm from './Blogform'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table , Button} from 'semantic-ui-react'


const Bloglist = (props) => {


  const togglevis = (event) => {
    event.preventDefault()
    props.setVis(props.showForm?false:true)}

  //const userblogs = blogs.filter(blog=> blog.user.username===user.username)
  const userblogs = props.blogs
  return(
    <div>
      <h1>blogs</h1>


      {props.showForm?
        <div><BlogForm user = {props.user} 
          blogs = {props.blogs} 
          setBlogs = {props.setBlogs}
          setVis={props.togglevis} />
        <Button onClick={togglevis}>cancel</Button>
        </div>:
        <Button onClick={togglevis}>new note</Button>}

      <Table striped>
        <Table.Body>
          {userblogs.map(blog => 
            <Table.Row key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </Table.Row>)}
        </Table.Body>
      </Table>


    </div>

  )}

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bloglist)