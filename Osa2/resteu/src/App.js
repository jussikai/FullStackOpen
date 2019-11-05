import React, {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios'


const Country = ({country}) =>{
  const [weather, setweather] = useState({current:[{temperature: 0,
    wind_speed:0 , wind_dir: "", weather_icons: ""
  }
  ]})

  useEffect(() => {
  axios
    .get('http://api.weatherstack.com/current', {
    params: {
      access_key: 'b56ee267f6b24c4be2935e77bc6c8841',
      query: country.capital
      }})
    .then(response => {
      console.log('promise fulfilled')
      console.log(response.data)
      setweather(response.data)
    }
    )
  },[])


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
    <h2>Weather in {country.capital}</h2>
    <p>temperature: {weather.current.temperature}</p>
    <img 
      src={weather.current.weather_icons}
      alt = ""
      height = "50"
      />
    <p>wind: {weather.current.wind_speed} kph 
     direction {weather.current.wind_dir}</p>
    </div>)

}


/*
    <p>temperature: {weather.current.temperature}</p>
    <img 
      src={weather.weather_icons[0]}
      alt = ""
      height = "50"
      />
    <p>wind: {weather.current.wind_speed} 
    kph direction {weather.current.wind_dir}</p>
    */
const Data = ({data}) => {
  const Note = ({country}) => 
  <li key = {country.name}>{country.name} <button>
    show</button></li>

  const rows = () => data.map(country => 
    <Note key = {country.name} country = {country}/>)
  
  if(data.length > 10){
    return(
      <div>Too many matches, specify another filter</div>
    )
  }
  else if(data.length !== 1){
    return(<div>
      <ul>
        {rows()}
      </ul>
    </div>)
  }
  return(<div><Country country = {data[0]}/></div>)


}

function App() {
  const [filter, setFilter] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {

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
