const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')





blogsRouter.get('/', async (request, response,next) => {
    try{
      blogs = await Blog
      .find({}).populate('blogs').populate('user',{username:1,name:1})
      response.json(blogs)
    } catch(exception){
      next(exception)
    }
  })
  
blogsRouter.post('/', async (request, response,next) => {
  const blog = new Blog(request.body)

  if(!blog.title || !blog.url){
    response.status(400)
    }
  else{
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }

      const user = await User.findById(decodedToken.id)

      blog.likes = blog.likes?blog.likes:0
      blog.user = user._id

      console.log(blog.title)
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
      }catch(exception){
        next(exception)
      }
  }
})

blogsRouter.delete('/:id',async (request, response,next) => {
  try{
    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (!blog){
      return response.status(404).end()
    }
    if (decodedToken.id.toString() === blog.user.toString()){
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()}  
    else{
      response.status(401).json({ error: 'token missing or invalid' })
    }
  }
  catch(exception){
    next(exception)
  }
})

blogsRouter.put('/:id',async (request, response,next) => {
  blog = request.body
  blog.likes = blog.likes?blog.likes:0
  try{updated = await Blog.findByIdAndUpdate(request.params.id,blog,{new:true})
  response.json(updated.toJSON())}
  catch(exception){
    next(exception)
  }
})


module.exports = blogsRouter