import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { BaseUrl } from "../Url";

const initialState = {
    authData: null,
    loading: false,
    error: false,
    isSignup: false,
};

export const signUp = createAsyncThunk("auth/signup", async (formData, { rejectWithValue }) => {
    try {
        alert("res_start")
        const response = await axios.post(`${BaseUrl}/auth/register`, formData);
        alert("res")
        // console.log(response)
        // alert("res")
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
        const { data } = await axios.post(`${BaseUrl}/auth/login`, formData)

        return data;
    } catch (error) {
        console.log(error.response.data)
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.pending, (state, action) => {
            return {
                ...state, loading: true, error: false
            };
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            console.log(action)
            alert("s")
            localStorage.setItem('profile', JSON.stringify(action?.payload))
            return {
                ...state, authData: action?.payload, loading: false, error: false
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
            localStorage.setItem('profile', JSON.stringify(action?.payload))
            return {
                ...state, authData: action?.payload, loading: false, error: false
            };
        });
        builder.addCase(logIn.rejected, (state, action) => {

            return {
                ...state, loading: false, error:action.payload,
            }
        })
    }

})
export const {changeForm}=authSlice.actions
export default authSlice.reducer;

//   extraReducers: {
//         [signUp.pending]: (state, action) => {
//             return {
//                 ...state, loading: true, error: false
//             };
//         },
//         [signUp.fulfilled]: (state, action) => {
//             alert()
//             localStorage.setItem('profile', JSON.stringify(action?.payload))
//             return {
//                 ...state, authData: action?.payload, loading: false, error: false
//             };
//         },
//         [signUp.rejected]: (state, action) => {
//             return {
//                 ...state, loading: false, error: true,
//             }
//         },
//         [logIn.pending]: (state, action) => {
//             return {
//                 ...state, loading: true, error: false
//             };
//         },
//         [logIn.fulfilled]: (state, action) => {
//             localStorage.setItem('profile', JSON.stringify(action?.payload))
//             return {
//                 ...state, authData: action?.payload, loading: false, error: false
//             };
//         },
//         [logIn.rejected]: (state, action) => {
//             return {
//                 ...state, loading: false, error: true,
//             }
//         },

//     }