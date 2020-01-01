import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {logoutUser} from '../reducers/userReducer'
import { Menu, Button } from 'semantic-ui-react'

const NavigationMenu = (props) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Menu>
        <Menu.Item link><Link style={padding} to="/blogs">blogs</Link></Menu.Item>
        <Menu.Item link><Link style={padding} to="/users">users</Link></Menu.Item>
        <Menu.Item>{props.user.name?props.user.name:props.user.username} logged in </Menu.Item>
        <Menu.Item><Button onClick={props.logoutUser}>logout</Button></Menu.Item>       
      </Menu>
        
    </div>
  )
}

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  return {
    user: state.user
  }
}
  
const mapDispatchToProps = {
  logoutUser
}
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationMenu)