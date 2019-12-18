const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

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

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })
    
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
        }
    
        await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
    describe('when there is initially one user at db', () => {
        // ...
      
        test('creation fails with proper statuscode and message if username already taken', async () => {
          const usersAtStart = await helper.usersInDb()
      
          const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
          }
      
          const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
      
          expect(result.body.error).toContain('`username` to be unique')
      
          const usersAtEnd = await helper.usersInDb()
          expect(usersAtEnd.length).toBe(usersAtStart.length)
        })
      })
    })


afterAll(() => {
  mongoose.connection.close()
})