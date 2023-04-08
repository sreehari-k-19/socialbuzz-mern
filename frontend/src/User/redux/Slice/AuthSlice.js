import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { BaseUrl } from "../Url";
import { toast } from 'react-toastify';


const config = {};
if (localStorage.getItem('profile')) {
    config.headers = {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
}

const infoToast = (email) => {
    toast.info(`Check you email ${email} to verify your account`, {
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
const msgToast=(msg,mail)=>{
    toast.info(`${msg}${mail}`, {
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
let toastid;
const initialState = {
    authData: null,
    loading: false,
    error: false,
    isSignup: false,
    verify: false,
    resetSucess:false,
};

export const signUp = createAsyncThunk("auth/signup", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BaseUrl}/auth/register`, formData);

        return response.data;
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
    }
})

export const logIn = createAsyncThunk("auth/login", async (formData, { rejectWithValue }) => {
    try {
        const { data, status } = await axios.post(`${BaseUrl}/auth/login`, formData)
        return { data, status };
    } catch (error) {
        console.log("login errror",error)
        return rejectWithValue(error.response)
    }
})

export const verifyToken = createAsyncThunk("auth/verfy", async (urlData, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${BaseUrl}/auth/${urlData.id}/verify/${urlData.token}`)
        return data;
    } catch (error) {
        console.log(error.response.data)
        return rejectWithValue(error.response.data)
    }
})

export const updateUser = createAsyncThunk('updateUser', async (userDetails, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${BaseUrl}/user/${userDetails.id}`, userDetails.formData)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const followUser = createAsyncThunk("followuser", async ({ _id, user }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${BaseUrl}/user/${_id}/follow`, user,config)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const unFollowUser = createAsyncThunk("unfollowuser", async ({ _id, user }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${BaseUrl}/user/${_id}/unfollow`, user, config)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const forgotPassword = createAsyncThunk('forgotpassword', async (username, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${BaseUrl}/auth/forgotpassword`, username)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const resetPassword = createAsyncThunk('resetpassword',async({resetData,navigate},{rejectWithValue})=>{
    try {
        const {data}=await axios.post(`${BaseUrl}/auth/resetpassword`,resetData)
        return data; 
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const googleRegister = createAsyncThunk('googleregister',async(token,{rejectWithValue})=>{
    try {
        const {data}=await axios.post(`${BaseUrl}/auth/google`,token)
        return data; 
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const updateProfilepicture = createAsyncThunk('updateProfilepicture',async({id,file},{rejectWithValue})=>{
    try {
        const {data}=await axios.put(`${BaseUrl}/user/${id}/updateprofile`,file)
        return data; 
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const UpdateCoverPicture = createAsyncThunk('UpdateCoverPicture',async({id,file},{rejectWithValue})=>{
    try {
        const {data}=await axios.put(`${BaseUrl}/user/${id}/updatecover`,file)
        return data; 
    } catch (error) {
        return rejectWithValue(error.response)
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        changeForm(state, action) {
            return {
                authData: null,
                loading: false,
                error: false,
                isSignup: !action.payload,
            }
        },
        LogOut(state, action) {
            localStorage.clear()
            return {
                ...state, authData: null,
                loading: false,
                error: false,
                isSignup: false,
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.pending, (state, action) => {
            return {
                ...state, loading: true, error: false
            };
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            infoToast(action.payload.msg)
            // localStorage.setItem('profile', JSON.stringify(action?.payload))
            return {
                ...state, loading: false, error: false, isSignup: false
            };
        });
        builder.addCase(signUp.rejected, (state, action) => {
            return {
                ...state, loading: false, error: action.payload,
            }
        })
        builder.addCase(logIn.pending, (state, action) => {
            return {
                ...state, loading: true, error: false
            };
        });
        builder.addCase(logIn.fulfilled, (state, action) => {
            const { data, status } = action.payload
            if (status === 201) {
                infoToast(data.email)
                return {
                    ...state, loading: false, error: false
                };
            }
            localStorage.setItem('profile', JSON.stringify(action?.payload.data))
            return {
                ...state, authData: action?.payload.data, loading: false, error: false
            };
        });
        builder.addCase(logIn.rejected, (state, action) => {
            const { data, status } = action.payload
            if (status === 403) {
                msgToast("your account is blocked by admin!","")
                return {
                    ...state, loading: false, error: false
                };
            }
            return {
                ...state, loading: false, error: action.payload,
            }
        })
        builder.addCase(verifyToken.pending, (state, action) => {

            return {
                ...state, verify: false
            }
        })
        builder.addCase(verifyToken.fulfilled, (state, action) => {

            return {
                ...state, verify: true
            }
        })
        builder.addCase(verifyToken.rejected, (state, action) => {
            return {
                ...state, verify: false
            }
        })
        builder.addCase(updateUser.pending, (state, action) => {
            return { ...state, loading: true, error: false }
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            console.log(action.payload, "update action")
            localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
            return { ...state, authData: action.payload, loading: false, error: false }
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            return { ...state, loading: true, error: true }
        })
        builder.addCase(followUser.fulfilled, (state, action) => {
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following, action.data] } } }
        })
        builder.addCase(unFollowUser.fulfilled, (state, action) => {
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following.filter((_id) => _id !== action.data)] } } }
        })
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            msgToast(action.payload.msg,action.meta.arg.username)
            return { ...state }
        })
        builder.addCase(resetPassword.fulfilled,(state,action)=>{
            action.meta.arg.navigate('/auth')
            msgToast(action.payload.msg,"")
            return{...state}
        })
        builder.addCase(resetPassword.rejected,(state,action)=>{
            msgToast(action.payload.msg,"")
            return{...state}
        })
        builder.addCase(googleRegister.fulfilled,(state,action)=>{
            console.log("google auth...",action.payload)
            localStorage.setItem('profile', JSON.stringify(action?.payload))
            return {
                ...state, authData: action?.payload, loading: false, error: false
            };
        })
        
        builder.addCase(updateProfilepicture.pending,(state,action)=>{
            toastid = toast.loading('Uploading...', { position: 'top-center' });
            return{...state}
        })
        builder.addCase(updateProfilepicture.fulfilled,(state,action)=>{
            toast.update(toastid, { render: "profileChanged.", type: "success", isLoading: false, position: 'top-center', autoClose: 3000 });
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, profilePicture: action.payload.profilePicture } } }
        })
        builder.addCase(UpdateCoverPicture.pending,(state,action)=>{
            toastid = toast.loading('Uploading...', { position: 'top-center' });
            return{...state}
        })
        builder.addCase(UpdateCoverPicture.fulfilled,(state,action)=>{
            toast.update(toastid, { render: "profileChanged.", type: "success", isLoading: false, position: 'top-center', autoClose: 3000 });
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, coverPicture: action.payload.coverPicture } } }
        })
    }

})
export const { changeForm, LogOut } = authSlice.actions
export default authSlice.reducer;
