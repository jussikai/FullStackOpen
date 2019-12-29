import React from 'react'
import { connect } from 'react-redux'
import {setFilter} from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    props.setFilter(event.target.value)


  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
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
  setFilter,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)