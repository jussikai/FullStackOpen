import React, { useState } from 'react'

const Filter = (props) =>{
 
    return(
      <div>filter shown with<input 
      onChange = {props.handleFilChange} 
      value = {props.filter} /></div>
    )
  }

export default Filter