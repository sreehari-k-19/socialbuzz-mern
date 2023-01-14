import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { BaseUrl } from "../Url";

const initialState = {
    authData: null,
    loading: false,
    error: false
};

export const signUp = createAsyncThunk("auth/signup", async (formData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${BaseUrl}/auth/register`, formData);
        return data;
    } catch (error) {
        console.log(error.data)
        return rejectWithValue(error.data)
    }
})

export const logIn = createAsyncThunk("auth/login", async (formData, { rejectWithValue }) => {
    try {
        const { data } = axios.post(`${BaseUrl}/auth/login`, formData)
        alert()
        return data;
    } catch (error) {
        console.log(error.data)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [signUp.pending]: (state, action) => {
            return {
                ...state, loading: true, error: false
            };
        },
        [signUp.fulfilled]: (state, action) => {
            alert()
            localStorage.setItem('profile', JSON.stringify(action?.payload))
            return {
                ...state, authData: action?.payload, loading: false, error: false
            };
        },
        [signUp.rejected]: (state, action) => {
            return {
                ...state, loading: false, error: true,
            }
        },
        [logIn.pending]: (state, action) => {
            return {
                ...state, loading: true, error: false
            };
        },
        [logIn.fulfilled]: (state, action) => {
            localStorage.setItem('profile', JSON.stringify(action?.payload))
            return {
                ...state, authData: action?.payload, loading: false, error: false
            };
        },
        [logIn.rejected]: (state, action) => {
            return {
                ...state, loading: false, error: true,
            }
        },

    }
})

export default authSlice.reducer;