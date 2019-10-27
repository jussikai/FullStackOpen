import React from 'react'
import ReactDOM from 'react-dom'


const Course = (props) => {
  return(
  <div>
    <Header course = {props.course.name} />
    <ul>
    <Content parts = {props.course.parts} />
    </ul>
    <Total parts = {props.course.parts}/>
  </div>
  )
}

const Header = (props) => {
    return (
      <h1>
        {props.course}   
      </h1>
    )
}

const Part = ({part}) => {
  return(
    <li >{part.name} {part.exercises}</li>
  )
}

const Content = ({parts}) => parts.map(part =>
  <Part key = {part.id} part = {part} />
)


const Total = ({parts}) => {
    const sum = parts.map(part => part.exercises).
    reduce( (s,p) => s+p )
    return (
        <h2>Total of {sum} exercises</h2>
    )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
 
  return (
    <div>
      {courses.map(course => <Course course={course} />)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))