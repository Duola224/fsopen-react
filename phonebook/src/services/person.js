import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const update = (id, obj) => {
    const req = axios.put(`${baseUrl}/${id}`, obj)
    return req.then(resp => resp.data)
}

const create = (obj) => {
    console.log("Person to create: ", obj)
    const req = axios.post(`${baseUrl}`, obj)
    return req.then(resp => resp.data)
}

const getAll = () => {
    const req = axios.get(`${baseUrl}`)
    return req.then(resp => resp.data)
}

const remove = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(body => body.data)
}
export default { getAll, create, update, remove }