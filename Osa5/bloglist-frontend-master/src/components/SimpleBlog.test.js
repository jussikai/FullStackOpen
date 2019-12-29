import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Kolli Matikainen',
    likes: 4
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

  expect(component.container).toHaveTextContent(
    '4'
  )

})

test('clicking the button twice calls event handler twice', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Kolli Matikainen',
        likes: 4
      }
  
    const mockHandler = jest.fn()
  
    const { getByText } = render(
      <Blog blog={blog} onClick={mockHandler} />
    )
  
    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })