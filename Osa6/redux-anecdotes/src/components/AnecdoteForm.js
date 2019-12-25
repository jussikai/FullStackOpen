import React from 'react';
import { connect } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'



const AnecdoteForm = (props) => {
    const addAnecdote = (event) =>{
        event.preventDefault()
        console.log(event.target.anecdote.value)
        props.createAnecdote(event.target.anecdote.value)
        }
    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
            <div><input name='anecdote'/></div>
            <button type="submit">create</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    // joskus on hyödyllistä tulostaa mapStateToProps:ista...
    console.log(state)
    return {
      anecdotes: state.anecdotes,
      filter: state.filter
    }
  }
  
const mapDispatchToProps = {
    createAnecdote,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteForm)