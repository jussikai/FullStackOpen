require('dotenv').config()
const { ApolloServer,UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const MONGODB_URI = process.env.MONGODB_URI

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
    bookCount: Int
  }
  type Book{
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
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
    allAuthors: () => {return Author.find({})}
  },
  Author:{
    bookCount: (root)=> {return Book.collection.countDocuments({name:root.name})}
  },
  Mutation: {
    addBook: async (root, args) => {   
      console.log(await Author.findOne({}))
      console.log('moi')
      if(!(await Author.findOne({name:args.author}))){
        console.log('adding author')
        author = new Author({name: args.author, born: null})
        await author.save()
        console.log(author)
      }
      const book = new Book({ ...args, author:(await Author.findOne({name:args.author}))})
      console.log(book)
      return book.save()
    },
    editAuthor: async (root, args) =>{
      console.log(args.setBornTo)
      console.log(await Author.findOne({name:args.name}))
      author = await Author.findOne({name:args.name})
      if(!author){
        console.log('not found')
        return null
      }
      changed = {born: args.setBornTo}
      console.log(changed)
      return Author.findByIdAndUpdate(author.id,changed)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})