import React from 'react'
import './App.css'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {BrowserRouter as Router,
  Route} from 'react-router-dom'
import {initializeUserList} from './reducers/userlistReducer'
import { Container } from 'semantic-ui-react'

import Bloglist from './components/Bloglist.js'
import Loginform from './components/Loginform'
import Notification from './components/Notification'
import {initializeBlogs} from './reducers/blogReducer'
import {initializeUser} from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import Blog from './components/Blog'




const App = (props) => {
  const [showForm,setVis] = useState(false)

  useEffect(() => {    
    props.initializeBlogs()
  },[])
    
  useEffect(()=>{       
    props.initializeUserList()
  },[])

  useEffect(() => {
    props.initializeUser()
  }, [])


  return (
    <Container className="App">
      <Notification/>
      {props.user === null ?
        <Loginform /> :       
        <Router>
          <Menu />
          <Route exact path='/blogs' render={()=>
            <Bloglist showForm={showForm} setVis={setVis}/>}/> 
          <Route exact path = "/blogs/:id" render={({match})=>
            <Blog id = {match.params.id}/>}/>  
          <Route exact path='/users' render={()=><Users/>}/>
          <Route exact path = "/users/:id" render={({match})=>
            <User id = {match.params.id}/>}/>
        </Router>
      }
      
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userlist: state.userlist
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUser,
  initializeUserList
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

