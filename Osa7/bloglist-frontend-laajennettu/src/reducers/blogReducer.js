import blogService from '../services/blogs'


//const getId = () => (100000 * Math.random()).toFixed(0)

export const createBlog = (user,blog)=>{
  return async dispatch => {
    try{
      const newBlog = await blogService.add({user:user, blog:blog})
      console.log(newBlog)
      dispatch({type:'ADD', blog:{...newBlog, user:{username:user.username}}})
      dispatch({type:'SET_NOT', str:`a new blog ${blog.title} added`})
      setTimeout(()=>{
        dispatch({type:'STOP'})},5000)
        
    }catch(exception){
      dispatch({type:'SET_NOT', str:'an error occurred'})
      setTimeout(()=>{
        dispatch({type:'STOP'})},5000)
    }
  }
}


export const likeBlog = (id,blogs) => {
  const blog = blogs.find(blog => blog.id === id)
  const changed= {
    likes: blog.likes+1,
    id : blog.id
  }
  console.log(changed)
  return async dispatch => {
    const updated = await blogService.update(changed)
    dispatch({type:'LIKE', id:id, data:updated})
  }
}

export const initializeBlogs = () =>{
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const removeBlog = (id,user) =>{
  return async dispatch => {
    await blogService.remove({ user:user.token,id:id })
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const commentBlog = (id, comment) =>{
  return async dispatch => {
    const commented = await blogService.comment(id,comment)
    console.log('commented')
    dispatch({
      type:'COMMENT',
      data:commented
    })
  }
}

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LIKE':
    return state.map(blog => blog.id!==action.id?blog:action.data).sort((a,b)=>(a.likes<b.likes)?1:-1)

  case 'ADD':{    
    const newBlog = action.blog
    return state.concat(newBlog)
  }
  
  case 'INIT_BLOGS':
    return action.data.sort((a,b)=>(a.likes<b.likes)?1:-1)

  case 'COMMENT':
    return state.map(blog => blog.id!==action.data.id?blog:action.data).sort((a,b)=>(a.likes<b.likes)?1:-1)

  default: return state
  }
}

export default reducer