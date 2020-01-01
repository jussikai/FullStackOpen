import React from 'react'
import {useField} from '../hooks'
import { connect } from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'
import {loginUser} from '../reducers/userReducer'
import { Form, Button } from 'semantic-ui-react'

const Loginform = (props) => {    
  const {reset:usernamereset, ...username} = useField('text')
  const {reset:passwordreset, ...password} = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.loginUser(username.value, password.value)
      usernamereset()
      passwordreset()
    } catch (exception) {
      props.setNotification('wrong username or password',5)
    }
  }

  return(
    <div>
      <h1>log in to application</h1>
      <Form onSubmit={handleLogin}>
        <div>
            username
          <input
            {...username}
          />
        </div>
        <div>
      password
          <input
            {...password}
          />
        </div>
        <Button type="submit">login</Button>
      </Form>
    </div>
  )}


const mapDispatchToProps = {
  setNotification,
  loginUser
}

export default connect(
  null,
  mapDispatchToProps
)(Loginform)