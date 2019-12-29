const initialState = ''

export const setFilter = (str) => ({type:'SET',filter:str})


const reducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'SET':
            return action.filter
        default: return state
    }
}

export default reducer