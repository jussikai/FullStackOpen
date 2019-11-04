import React, {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios'

const Country = ({country}) =>{

  return(<div>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h2>languages</h2>
      <ul>
        {country.languages.map(lan => <li key = {lan.name}>{lan.name}</li>)}
      </ul>
      <img 
      src={country.flag}
      alt = ""
      height = "200"
      />
    </div>)
}

const Data = ({data}) => {
  console.log(data)
  const Note = ({country}) => 
  <li key = {country.name}>{country.name}</li>

  const rows = () => data.map(country => 
    <Note key = {country.name} country = {country}/>)
  
  if(data.length > 10){
    return(
      <div>Too many matches, specify another filter</div>
    )
  }
  else if(data.length===1){
    return(<div><Country country = {data[0]}/></div>)
  }
  return(<div>
    <ul>
      {rows()}
    </ul>
  </div>)

}

function App() {
  const [filter, setFilter] = useState('')
  const [data, setData] = useState([])
  


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setData(response.data)
      })
  },[])

  const handleFilChange = (event) => setFilter(event.target.value)

  const toShow = data.filter(country => country.name.toLowerCase()
    .includes(filter.toLowerCase()))
  
  console.log(toShow)
  return (
    <div>
      <form>
      <div>find countries <input 
      onChange = {handleFilChange} 
      value = {filter}/></div>
      </form>
      <Data data = {toShow} />
    </div>
  );
}

export default App;
