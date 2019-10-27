import React from 'react'
import ReactDOM from 'react-dom'


const Course = (props) => {
  console.log(props)
  //const rows = () => 
  return(
  <div>
    <Header course = {props.course.name} />
    <ul>
    <Content parts = {props.course.parts} />
    </ul>
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

/*
const Total = (props) => {
    const [p1,p2,p3] = props.parts
    return (
        <p>Number of exercises {p1.exercises + p2.exercises + p3.exercises}</p>
    )
}
*/

const App = () => {
  const course = {
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
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))