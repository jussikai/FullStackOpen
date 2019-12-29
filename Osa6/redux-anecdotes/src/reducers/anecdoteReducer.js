import anecdoteService from '../services/anecdotes'


//const getId = () => (100000 * Math.random()).toFixed(0)

export const createAnecdote = (anecdote)=>{
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({type:'ADD', anecdote:newAnecdote})
  }
}

export const voteAnecdote = (id,anecdotes) => {
  const anecdote = anecdotes.find(anecdote => anecdote.id === id)
  const changed= {
    ...anecdote,
    votes: anecdote.votes+1
  }
  return async dispatch => {
    await anecdoteService.update(changed)
    dispatch({type:'VOTE', id:id, data:anecdotes})
  }
}

export const initializeAnecdotes = (anecdotes) =>{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes
  })
}
}

const initialState = []

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const changed= {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes+1
      }
      return state.map(anecdote => anecdote.id!==id?anecdote:changed).sort((a,b)=>(a.votes<b.votes)?1:-1)

    case 'ADD':
      console.log(action.anecdote)
      const newAnecdote = action.anecdote
      return state.concat(newAnecdote)

    case 'INIT_ANECDOTES':
      console.log(action.data)
      return action.data
    
    default: return state
  }
}

export default reducer