import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { BaseUrl } from "../Url";
import { toast } from 'react-toastify';


const msgToast=(msg)=>{
    toast.info(`${msg}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}


const initialState = { posts: null, loading: false, error: false, uploading: false };


export const uploadPost = createAsyncThunk("post/upload", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BaseUrl}/upload`, data)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const fetchPosts = createAsyncThunk("post/get", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BaseUrl}/post/${id}/timeline`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const likePost = createAsyncThunk("post/get", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BaseUrl}/post/${id}/timeline`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const deletePost = createAsyncThunk("post/delete", async ({ id, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${BaseUrl}/post/${id}?userId=${userId}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const editPost = createAsyncThunk('post/edit', async ({ id, postData }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${BaseUrl}/post/${id}`, postData)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
})

export const reportPost = createAsyncThunk('post/report',async({id,report},{rejectWithValue})=>{
    try {
        const {data} = await axios.post(`${BaseUrl}/report/${id}`,report)
        return data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
let toastid;
const uploadPostSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(uploadPost.pending, (state, action) => {
            toastid = toast.loading('Uploading...', { position: 'top-center' });
            return { ...state, error: false, uploading: true };
        });
        builder.addCase(uploadPost.fulfilled, (state, action) => {
            toast.update(toastid, { render: "Post Added.", type: "success", isLoading: false, position: 'top-center', autoClose: 3000 });
            return { ...state, posts: [action.payload, ...state.posts], uploading: false, error: false };
        });
        builder.addCase(uploadPost.rejected, (state, action) => {
            toast.update(toastid, { render: "There was an error submitting your post.", type: "error", isLoading: false, position: 'top-center', closeOnClick: true, });
            return { ...state, uploading: false, error: true };
        })
        builder.addCase(fetchPosts.pending, (state, action) => {
            return { ...state, loading: true, error: false };
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            return { ...state, posts: action.payload, loading: false, error: false };
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            return { ...state, loading: false, error: true };
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
            const postId = action.meta.arg.id;
            const updatedPosts = state.posts.filter(post => post._id !== postId);
            return { ...state, posts: updatedPosts, uploading: false, error: false };
        })
       builder.addCase(editPost.fulfilled,(state,action)=>{
        return{...state,}
       })
       builder.addCase(reportPost.fulfilled,(state,action)=>{
        msgToast(action.payload.msg)
        return{...state}
       })
    },

})

export default uploadPostSlice.reducer;
