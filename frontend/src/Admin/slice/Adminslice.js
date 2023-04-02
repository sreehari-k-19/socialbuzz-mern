import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
const BaseUrl = process.env.REACT_APP_baseURL;


const initialState = {
    loading: false,
    error: false,
}

export const blockUser = createAsyncThunk("blockUser", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${BaseUrl}/admin/block/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const adminSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers:(builder)=>{

    }

})

export default adminSlice.reducer;