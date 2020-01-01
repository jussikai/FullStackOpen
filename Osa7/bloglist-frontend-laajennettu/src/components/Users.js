import React from 'react'
import { connect } from 'react-redux'

import {Link} from 'react-router-dom'
import { Table} from 'semantic-ui-react'

const Users = (props) =>{


  return(
    <div>
      <h1>Users</h1>
      <Table striped celled>
        <Table.Body>
          <tr>
            <th></th>
            <th>
                            blogs created
            </th>
          </tr>
          {props.userlist.map(u =>
            <Table.Row key={u.username}>
              <Table.Cell><Link to={`/users/${u.id}`}>{u.username}</Link></Table.Cell>
              <Table.Cell>{u.blogs.length}</Table.Cell>
            </Table.Row>
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
)(Users)