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


module.exports = blogsRouter