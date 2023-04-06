import axios from "axios";
// const API = axios.create({ baseURL: "http://localhost:5000" });

// // API.interceptors.request.use((req) => {
// //     if (localStorage.getItem('profile')) {
// //       req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
// //     }
  
// //     return req;
// //   });

const baseURL=process.env.REACT_APP_baseURL
// const baseURL= "http://localhost:5000"
export const getUserrr = () => axios.get(`${baseURL}/admin/getAllUsers`);
export const getUser = (id) => axios.get(`${baseURL}/admin/user/${id}`);
export const getPosts =(id)=>axios.get(`${baseURL}/admin/getposts/${id}`)
export const  getPost =(id)=> axios.get(`${baseURL}/admin/getpost/${id}`)
export const  fetchblockedUsers =()=> axios.get(`${baseURL}/admin/blockedusers`)


// const baseURL="http://localhost:5000"
export const getAllUsers = () => fetch(`${baseURL}/admin/getAllUsers`).then((res)=>res.json());
export const getAllReports = () => axios.get(`${baseURL}/admin/allreports`);
