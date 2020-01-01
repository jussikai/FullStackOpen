import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (props.notification?
    <Message style={style}>
      {props.notification}
    </Message>:null
  )
}

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)