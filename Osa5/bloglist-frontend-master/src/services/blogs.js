import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = (data) => {
  const headers = { Authorization:`bearer ${data.user.token}` }
  const request = axios.post(baseUrl,data.blog,{ headers:headers })
  return request.then(response => response.data)

}

const like = (data) => {
  console.log(data)
  const request = axios.put(`${baseUrl}/${data.id}`,data)
  return request.then(response => response.data)
}

const remove = (data) => {
  const headers = { Authorization:`bearer ${data.user}` }
  const request = axios.delete(`${baseUrl}/${data.id}`,{ headers:headers })
  return request.then(response => response.data)
}

export default { getAll, add, like, remove }