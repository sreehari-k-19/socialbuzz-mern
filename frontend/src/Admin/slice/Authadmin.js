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
    adminAuth:null,
}


export const adminLogin = createAsyncThunk("adminLogin", async (admindata, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${BaseUrl}/admin/login`,admindata);
        return data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
    }
})

const adminAuthSlice = createSlice({
    name: "adminauth",
    initialState,
    reducers:{
        AdminLogOut(state, action) {
            localStorage.clear()
            return {
                ...state,  loading: false,
                error: false,
                adminAuth:null,
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(adminLogin.fulfilled,(state,action)=>{
            localStorage.setItem('admintoken', JSON.stringify(action?.payload))
            return {
                ...state,adminAuth:action?.payload
            };
        })
        builder.addCase(adminLogin.rejected,(state,action)=>{
            msgToast(action.payload,"")
            return {
                ...state,adminAuth:null 
            };
            
        })
    }

})
export const { AdminLogOut } = adminAuthSlice.actions
export default adminAuthSlice.reducer;