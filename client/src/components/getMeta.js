import axios from 'axios'

const getMeta = async () => {
  const response = await axios.get('/api/')
  return response.data
}

export default getMeta
