import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Kolli Matikainen',
    url:'www.yle.fi',
    likes: 4,
    user:{username:'kalle',id:'safhnasklgjhasdiue'},
    id:'aslfkhasflikhfw'
  }

  const component = render(
    <Blog blog = {blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Kolli Matikainen'
  )


})

test('clicking the button shows more', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Kolli Matikainen',
        url:'www.yle.fi',
        likes: 4,
        user:{username:'kalle',id:'safhnasklgjhasdiue'},
        id:'aslfkhasflikhfw'
      }
    const user = {username:'aapeli',id:'123'}
  
  
    const component = render(
      <Blog blog={blog} user={user}/>
    )
  
    const button = component.getByText('Component testing is done with react-testing-library Kolli Matikainen')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
    'Kolli Matikainen'
    )
    expect(component.container).toHaveTextContent(
    '4'
    )
    expect(component.container).toHaveTextContent(
    'kalle'
    )



    fireEvent.click(button)
    expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
    'Kolli Matikainen'
    )
  })