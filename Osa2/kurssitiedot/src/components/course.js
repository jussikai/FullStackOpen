import React from 'react'

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
      <h2>
        {props.course}   
      </h2>
    )
}

const Part = ({part}) => {
  return(
    <li>{part.name} {part.exercises}</li>
  )
}

const Content = ({parts}) => parts.map(part =>
  <Part key = {part.id} part = {part} />
)


const Total = ({parts}) => {
    const sum = parts.map(part => part.exercises).
    reduce( (s,p) => s+p )
    return (
        <h3>Total of {sum} exercises</h3>
    )
}

export default Course