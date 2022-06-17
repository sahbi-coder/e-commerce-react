import axios from 'axios'

const BASE_URL= 'http://localhost:5000/api/'
const storage = JSON.parse(localStorage.getItem('persist:root'))

const user = storage?storage.user:null
const currentUser = user?JSON.parse(user).currentUser:null

const token= currentUser?currentUser.token:''

export const publicRequest = axios.create({
    baseURL:BASE_URL,
    

})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Baerer ${token}`}
})



