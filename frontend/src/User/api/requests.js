import axios from "axios"
const baseURL = 'http://localhost:5000';
export const likePost = async (postId, userId) => await axios.put(`${baseURL}/post/${postId}/like`, { userId: userId })
export const getUserprofile = async (userId) => await axios.get(`${baseURL}/user/${userId}`)
export const getAllUsers= async()=>await axios.get(`${baseURL}/user`)
export const deletePost =async(id,userId)=>await axios.delete(`${baseURL}/post/${id}?userId=${userId}`)
export const getReports=async()=>await axios.get(`${baseURL}/report`)