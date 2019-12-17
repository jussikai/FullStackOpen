import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const removeNum = (person) =>{
    const del = window.confirm(`delete ${person.name}`)
    if(del){
      return axios.delete(`${baseUrl}/${person.id}`)
     }
    return axios.get(baseUrl)
}

export default { getAll, create, update, removeNum }