import React from 'react';
import { connect } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {stopNotification} from '../reducers/notificationReducer'

const AnecdoteList= (props)=>{

    const vote = (id) => {
      console.log('vote', id)
      props.voteAnecdote(id,props.anecdotes)
      setTimeout(()=>{props.stopNotification()},3000)
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
  stopNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)