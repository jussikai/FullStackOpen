import React from 'react';
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {stopNotification} from '../reducers/notificationReducer'

const AnecdoteList= (props)=>{
    const {anecdotes, notification, filter} = props.store.getState()
    const toShow = anecdotes.filter(anecdote => anecdote.content.toLowerCase()
    .includes(filter.toLowerCase()) )

    const vote = (id) => {
      console.log('vote', id)
      props.store.dispatch(voteAnecdote(id))
      setTimeout(()=>{props.store.dispatch(stopNotification())},5000)
    }
    return(<div>
        {toShow.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
          </div>
    )
}

export default AnecdoteList