import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import userlistReducer from './reducers/userlistReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  userlist: userlistReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store