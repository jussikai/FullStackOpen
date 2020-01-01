import React from 'react'
import { connect } from 'react-redux'
import { Table} from 'semantic-ui-react'


const User = (props) =>{
  const user = props.userlist.find(user => user.id === props.id)
  if(user === undefined){
    return null
  }
  console.log('moi')
  console.log(user)
  return(
    <div>
      <h1>{user.username}</h1>
      <h2>added blogs</h2>
      <Table striped>
        <Table.Body>
          {user.blogs.map((blog)=>
            <Table.Row key={blog.id}>{blog.title}</Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  return {
    userlist: state.userlist
  }
}
  
const mapDispatchToProps = {
}
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)