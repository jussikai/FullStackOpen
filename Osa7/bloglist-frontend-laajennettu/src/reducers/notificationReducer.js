const initialState = null

export const setNotification = (str , num) =>{
  return async dispatch => {
    dispatch({type:'SET_NOT', str:str})
    setTimeout(()=>{
      dispatch({type:'STOP'})},1000*num)
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOT':
    return action.str
  case 'STOP':
    return null
            
  default: return state
  }
}

export default reducer