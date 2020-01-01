
import userServices from '../services/users'


export const initializeUserList = () =>{
  return async dispatch =>{
    try{const users = await userServices.getAll()
      dispatch({type:'SET_USERLIST', list:users})
    }
    catch(exception){
      console.log('an error occurred')
    }
        
  }
}

const reducer = (state = [], action) =>{
  switch(action.type){
  case 'SET_USERLIST':
    return action.list
  default: return state
  }
}

export default reducer