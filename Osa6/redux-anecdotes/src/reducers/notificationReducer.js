
const initialState = null

export const stopNotification = () => ({type:'STOP'})

const reducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'VOTE':
            const id = action.id
            return `you voted "${action.data.find(anecdote=> anecdote.id === id).content}"`
        case 'STOP':
            return null
            
        default: return state
    }
}

export default reducer