import React from 'react'
import {useField} from '../hooks'
import PropTypes from 'prop-types'
import loginService from '../services/login.js'

const Loginform = (props) => {    
    const {reset:usernamereset, ...username} = useField('text')
    const {reset:passwordreset, ...password} = useField('password')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username:
            username.value, password:password.value
            })
            window.localStorage.setItem(
            'loggedNoteappUser', JSON.stringify(user)
            )
            console.log(user)
            props.setUser(user)

        } catch (exception) {
            props.setNotification('wrong username or password')
            setTimeout(() => props.setNotification(null),3000)
        }
    }

    return(
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">login</button>
      </form>
    </div>
  )}

Loginform.propTypes = {
    setNotification: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,

}
export default Loginform