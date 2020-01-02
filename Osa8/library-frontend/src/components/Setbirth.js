import React, { useState} from 'react'

const SetBirth = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  if (!props.show) {
    return null
  }

  if(props.authors.loading){
    return <div>...loading</div>
  }
  console.log(props.authors)
  const submit = async (e) => {
    e.preventDefault()

    console.log('adit author...')
    console.log(name)
    await props.editAuthor({variables:{name,setBornTo:parseInt(born)}})
    setName('')
    setBorn('')
  }

  const handleChange = (event) =>{
      setName(event.target.value)
  }



return (
  <div>
      <h1>Set birthyear</h1>
    <form onSubmit={submit}>
      <div>
        name
        <select value ={name}
        onChange = {handleChange}>
            {props.authors.data.allAuthors.map(author => <option value = {author.name}
            key = {author.name}>{author.name}</option>)}

        </select>
      </div>
      <div>
        born
        <input
          type='number'
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
      </div>
      <button type='submit'>update author</button>
    </form>
  </div>
)
}

export default SetBirth