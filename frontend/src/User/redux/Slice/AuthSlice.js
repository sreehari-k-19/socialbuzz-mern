import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { BaseUrl } from "../Url";
import { toast } from 'react-toastify';

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

const initialState = {
    authData: null,
    loading: false,
    error: false,
    isSignup: false,
    verify: false
};

export const signUp = createAsyncThunk("auth/signup", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BaseUrl}/auth/register`, formData);

        return response.data;
    } catch (error) {
        alert("error")
        console.log(error.response);
        console.log(error.response.data);
        return rejectWithValue(error.response.data)
    }
})

export const logIn = createAsyncThunk("auth/login", async (formData, { rejectWithValue }) => {
    try {
        const { data, status } = await axios.post(`${BaseUrl}/auth/login`, formData)

        return { data, status };
    } catch (error) {
        console.log(error.response.data)
        return rejectWithValue(error.response.data)
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
        const { data } = await axios.put(`/user/${userDetails.id}`, userDetails.formData)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
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
            alert("res")

            console.log(action, action.payload, action.payload.status)
            infoToast(action.payload.msg)
            // localStorage.setItem('profile', JSON.stringify(action?.payload))
            return {
                ...state, loading: false, error: false, isSignup: false
            };
        });
        builder.addCase(signUp.rejected, (state, action) => {
            alert("r")
            console.log("ac", action)
            console.log("ac", action.error)
            alert("r")
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
            console.log(action, action.payload.data,"login action")
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
        builder.addCase(updateUser.pending,(state,action)=>{
            return {...state, loading: true , error: false}
        })
        builder.addCase(updateUser.fulfilled,(state,action)=>{
            console.log(action.payload,"update action")
            alert("up sus")
            localStorage.setItem("profile", JSON.stringify({...action?.payload}));
            return {...state, authData: action.payload, loading: false, error: false}
        })
        builder.addCase(updateUser.rejected,(state,action)=>{
            alert("up re")
            return {...state, loading: true, error: true}
        })
    }

})
export const { changeForm, LogOut } = authSlice.actions
export default authSlice.reducer;
