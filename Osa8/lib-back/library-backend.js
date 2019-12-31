const { ApolloServer, gql } = require('apollo-server')
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
    genres: [String]!
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
      author: String
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
    allBooks: (root,args) =>{
      let toRes = Book.find({})
      if(args.author){
        toRes = toRes.filter(book=>book.author===args.author)
      }
      if(args.genre){
        toRes = toRes.filter(book=>book.genres.find(genre=> genre ===args.genre))
      }
      return toRes},
    allAuthors: () =>{return Author.find({})}
  },
  Author:{
    bookCount: (root) => Book.find({}).filter(book => book.author === root.name).length
  },
  Mutation: {
    addBook: (root, args) => {
      const book = new Book({ ...args})
      
      if(!authors.find(author=>author.name===book.author)){
        author = {name: book.author, born: null, id:Math.floor(Math.random()*1000)}
        authors = authors.concat(author)
      }
      return book.save()
    },
    editAuthor: (root, args) =>{
      author = authors.find(author=>author.name===args.name)
      if(!author){
        return null
      }
      changed = {...author, born: args.setBornTo}
      authors = authors.map(author => author.name === changed.name?changed:author)
      return changed
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