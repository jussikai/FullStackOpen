import { gql } from 'apollo-boost'
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
        title
        author{name}
        published
        id
    }
  }
  
`