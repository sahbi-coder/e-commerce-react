import axios from "axios";


const storage = JSON.parse(localStorage.getItem("persist:root"));

const user = storage ? storage.user : null;
const currentUser = user ? JSON.parse(user).currentUser : null;

const token = currentUser ? currentUser.token : "";
console.log(process.env.NODE_ENV,process.env)
const baseURL = process.env.NODE_ENV==='production'?process.env.REACT_APP_BASE_URL:process.env.REACT_APP_BASE_URL_DEVELOPMENT
console.log(baseURL)

export const publicRequest = axios.create({
  baseURL,
});



export const userRequest = axios.create({
  baseURL,
  headers: { token: `Baerer ${token}` },
});

export const initilaRequest = (token) => {
  return axios.create({
    baseURL,
    headers: { token: `Baerer ${token}` },
  });
};
