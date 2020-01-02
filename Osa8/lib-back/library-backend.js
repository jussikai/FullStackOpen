require('dotenv').config()
const { ApolloServer,UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const LibUser = require('./models/libuser')
const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const MONGODB_URI = process.env.MONGODB_URI

const JWT_SECRET = 'SalaAvain'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/


const typeDefs = gql`
  type Author{
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Book{
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres:[String]
    ):Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }    
`

const resolvers = {
  Query: {
    hello: () => { return "world" },
    bookCount: () => {return Book.collection.countDocuments()},
    authorCount: () => {return Author.collection.countDocuments()},
    allBooks: async (root,args) =>{
      let toRes = await Book.find({}).populate('author')
      console.log(toRes)
      if(args.author){
        toRes = toRes.filter(book=>book.author.name===args.author)
      }
      if(args.genre){
        toRes = toRes.filter(book=>book.genres.find(genre=> genre ===args.genre))
      }
      return toRes},
    allAuthors: () => {return Author.find({})},
    me: (root, args, context) => {
      console.log(context.currentUser)
      return context.currentUser
    }
  },
  Author:{
    bookCount: (root)=> root.authorBooks.length
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log(context.currentUser)
      if(!context.currentUser){
        throw new AuthenticationError("not authenticated")
      }   
      console.log('moi')
      let author = await Author.findOne({name:args.author})
      if(!(author)){
        console.log('adding author')
        author = new Author({name: args.author, born: null, authorBooks:[]})
        try{
        await author.save()
        console.log(author)
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      }
      const book = new Book({ ...args, author:author})
      try{
        console.log(book)
        await book.save()
        await Author.findByIdAndUpdate(author._id,{authorBooks:author.authorBooks.concat(book)})
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) =>{
      if(!context.currentUser){
        throw new AuthenticationError("not authenticated")
      }
      console.log(args.setBornTo)
      console.log(await Author.findOne({name:args.name}))
      author = await Author.findOne({name:args.name})
      if(!author){
        console.log('not found')
        return null
      }
      changed = {born: args.setBornTo}
      console.log(changed)
      try{
        return Author.findByIdAndUpdate(author.id,changed)
      }catch(error){
          throw new UserInputError(error.message, {
            invalidArgs: args,
        })
      }
    },
    createUser: (root, args) => {
      const user = new LibUser({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await LibUser.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await LibUser.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})