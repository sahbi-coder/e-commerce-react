import axios from 'axios'

const BASE_URL= 'http://localhost:5000/api/'

const user = JSON.parse(JSON.parse( localStorage.getItem('persist:root')).user)
const currentUser = user?user.currentUser:null
const token= currentUser?currentUser.token:''

export const publicRequest = axios.create({
    baseURL:BASE_URL,
    

})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Baerer ${token}`}
})


