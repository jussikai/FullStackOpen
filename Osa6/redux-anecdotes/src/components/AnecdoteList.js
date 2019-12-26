import React from 'react';
import { connect } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList= (props)=>{

    const vote = (id) => {
      console.log('vote', id)
      props.voteAnecdote(id,props.anecdotes)
      const votedAnecdote = props.anecdotes.find(anecdote=> anecdote.id === id)
      props.setNotification(`you voted '${votedAnecdote.content}'`,3)
    }
    return(<div>
        {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log(state)
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase()
    .includes(state.filter.toLowerCase()) )
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)