import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { BaseUrl } from "../Url";
import { toast} from 'react-toastify';

const initialState = { posts: null, loading: false, error: false, uploading: false };

// export const uploadImage = createAsyncThunk("upload", async (data, { rejectWithValue }) => {
//     try {
//         const response = await axios.post(`${BaseUrl}/upload`, data)
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })

export const uploadPost = createAsyncThunk("post/upload", async (data, { rejectWithValue }) => {
    try {
       
        alert()
        const response = await axios.post(`${BaseUrl}/upload`, data)

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const fetchPosts = createAsyncThunk("post/get",async(id,{rejectWithValue})=>{
    try {
        alert(id)
        const response = await axios.get(`${BaseUrl}/post/${id}/timeline`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}) 

let toastid ;
const uploadPostSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(uploadPost.pending, (state, action) => {
            toastid=toast.loading('Loading...',{ position: 'top-center' });
            return { ...state, error: false, uploading: true };
        });
        builder.addCase(uploadPost.fulfilled,(state,action)=>{
            toast.update(toastid, { render: "Post Added.", type: "success", isLoading: false,position: 'top-center', autoClose: 3000});
            return { ...state, posts: [action.payload, ...state.posts], uploading: false, error: false };
        });
        builder.addCase(uploadPost.rejected,(state,action)=>{
            toast.update(toastid, { render: "There was an error submitting your post.", type: "error", isLoading: false,position: 'top-center', closeOnClick: true,});
            return { ...state, uploading: false, error: true };
        })
        builder.addCase(fetchPosts.pending,(state,action)=>{
            return { ...state, loading: true, error: false };
        });
        builder.addCase(fetchPosts.fulfilled,(state,action)=>{
            return { ...state, posts: action.payload, loading: false, error: false };
        });
        builder.addCase(fetchPosts.rejected,(state,action)=>{
            return { ...state, loading: false, error: true };
        });
    },

})

export default uploadPostSlice.reducer;
