const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialNotes = [
    {
      title: 'Go To fsdsdfStatement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
    {
        title: 'Go To Statement Considerehfsdfhd Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 8,
      }
  ]
beforeEach(async () => {
    await Blog.remove({})
  
    const noteObjects = initialNotes
      .map(blog => new Blog(blog))
    const promiseArray = noteObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

test('correct amount of notes', async () => {
  const result = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    expect(result.body.length).toBe(3)
})

test('ids are defined', async () => {
    const result = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    result.body.forEach((blog)=>
    expect(blog.id).toBeDefined()
    )
      
  })

test('Post Adds blog', async () => {
    const NewBlog =
        {
            title: 'Mees Ny',
            author: 'mina itte',
            url: 'www.yle.fi',
            likes: 100
        }
    const orig = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    await api
        .post('/api/blogs')
        .send(NewBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const result = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        expect(result.body.length).toBe(orig.body.length+1)
})

test('Likes default 0', async () => {
    const NewBlog =
        {
            title: 'Mees Ny',
            author: 'mina itte',
            url: 'www.yle.fi'
        }
    
    await api
        .post('/api/blogs')
        .send(NewBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const result = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        expect(result.body[result.body.length-1].likes).toBe(0)
})

test('Bad Request', async () => {
    const NewBlog1 =
        {
            title: '',
            author: 'mina itte',
            url: 'www.yle.fi'
        }
    const NewBlog2 = 
        {
            title: 'Mees Ny',
            author: 'minaitte',
            url: ''
        }
    await api
        .post('/api/blogs')
        .send(NewBlog1)
        .expect(400)
    await api
        .post('/api/blogs')
        .send(NewBlog2)
        .expect(400)
    })

        


afterAll(() => {
  mongoose.connection.close()
})