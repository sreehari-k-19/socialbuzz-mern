import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from 'react-toastify';
const msgToast=(msg,mail)=>{
    toast.info(`${msg}${mail}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}
const BaseUrl = process.env.REACT_APP_baseURL;
// const BaseUrl="http://localhost:5000"

const initialState = {
    loading: false,
    error: false,
    data:null,
    adminAuth:null,
}

export const blockUser = createAsyncThunk("blockUser", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${BaseUrl}/admin/block/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const getDashboard = createAsyncThunk("getDashboard", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${BaseUrl}/admin/dashboard`);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
    }
})
export const blockPost = createAsyncThunk("blockPost", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${BaseUrl}/admin/blockpost/${id}`);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
    }
})


const adminSlice = createSlice({
    name: "admin",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getDashboard.pending,(state,action)=>{
            return {
                ...state, loading: true, error: false
            };
        })
        builder.addCase(getDashboard.fulfilled,(state,action)=>{
            return {
                ...state, loading: false, error: false, data:action.payload
            };
        })
    }

})

export default adminSlice.reducer;