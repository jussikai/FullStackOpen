const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', (request, response) => {
const blog = new Blog(request.body)

blog.likes = blog.likes?blog.likes:0
console.log(blog.title)
if(!blog.title || !blog.url){
  response.status(400).json(result)
  }
else{
  console.log('taal ollaan')
  blog
      .save()
      .then(result => 
      response.status(201).json(result)
      )
}
})

blogsRouter.delete('/:id',async (request, response) => {
  try{await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()}
  catch(exception){
    response.status(404).end()
  }
})

blogsRouter.put('/:id',async (request, response) => {
  blog = request.body
  blog.likes = blog.likes?blog.likes:0
  try{updated = await Blog.findByIdAndUpdate(request.params.id,blog,{new:true})
  response.json(updated.toJSON())}
  catch(exception){
    response.status(404).end()
  }
})


module.exports = blogsRouter