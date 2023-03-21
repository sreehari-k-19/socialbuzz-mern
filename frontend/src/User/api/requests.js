import axios from "axios"
import { async } from "react-input-emoji";
const baseURL = 'http://localhost:5000';
export const likePost = async (postId, userId) => await axios.put(`${baseURL}/post/${postId}/like`, { userId: userId })
export const getUserprofile = async (userId) => await axios.get(`${baseURL}/user/${userId}`)
export const getAllUsers= async()=>await axios.get(`${baseURL}/user`)
export const deletePost =async(id,userId)=>await axios.delete(`${baseURL}/post/${id}?userId=${userId}`)
export const getReports=async()=>await axios.get(`${baseURL}/report`)

export const userChats = async(id)=>await axios.get(`${baseURL}/chat/${id}`)

export const getMessages = async(id)=>await axios.get(`${baseURL}/message/${id}`)

export const addMessage=async(data)=>await axios.post(`${baseURL}/message/`,data)