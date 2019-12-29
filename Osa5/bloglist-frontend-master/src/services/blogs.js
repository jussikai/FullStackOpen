import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = (data) => {
  const headers = {Authorization:`bearer ${data.user.token}`}
  const request = axios.post(baseUrl,data.blog,{headers:headers})
  return request.then(response => response.data)

}

export default { getAll, add }