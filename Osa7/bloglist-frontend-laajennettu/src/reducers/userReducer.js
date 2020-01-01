import loginService from '../services/login'

export const loginUser = (username , password) =>{
    
  return async dispatch => {
    try{
      const user = await loginService.login({username:
                username, password:password
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      dispatch({type:'LOGIN', user:user})
    }catch(exception){
      dispatch({type:'SET_NOT', str:'wrong username or password'})
      setTimeout(()=>{
        dispatch({type:'STOP'})},5000)
    }
  }
}

export const logoutUser = () =>{
  return async dispatch => {
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch({type:'LOGOUT'})
  }
}

export const initializeUser = () =>{
  return dispatch =>{
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({type:'LOGIN', user:user})
    }
  }
}

const reducer = (state = null, action) =>{
  switch(action.type){
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default: return state
  }
}
export default reducer