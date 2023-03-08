import axios from "axios"
const baseURL = 'http://localhost:5000'
export const likePost = async (postId, userId) => await axios.put(`${baseURL}/post/${postId}/like`, { userId: userId })
export const getUserprofile = async (userId) => await axios.get(`${baseURL}/user/${userId}`)
