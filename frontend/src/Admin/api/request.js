// import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });

// // API.interceptors.request.use((req) => {
// //     if (localStorage.getItem('profile')) {
// //       req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
// //     }
  
// //     return req;
// //   });

// export const getUser = () => API.get(`/admin/getAllUsers`);
console.log(process.env.REACT_APP_baseURL)
// const baseURL="http://localhost:5000"
const baseURL=process.env.REACT_APP_baseURL
export const getAllUsers = () => fetch(`${baseURL}/admin/getAllUsers`).then((res)=>res.json());
export const getAllReports = () => fetch(`${baseURL}/admin/allreports`).then((res)=>res.json());
