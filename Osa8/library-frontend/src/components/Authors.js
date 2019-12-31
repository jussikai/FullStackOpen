import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

export const ALL_AUTHORS = gql`
{
  allAuthors{
    name
    born
    bookCount
  }
}`

export let authors = []
const Authors = (props) => {
  if (!props.show) {
    return null
  }

  return <Query query={ALL_AUTHORS}>
    {(result) => { 
      if ( result.loading ) {
        return <div>loading...</div>
      }
      authors = result.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
  }}
    </Query>
}

export default Authors