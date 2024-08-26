import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';


export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async ({username, email, password}, thunkAPI) => {
        try {
            const response = await axios.post('/api/auth/register',{username,email,password})
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async({email,password},thunkAPI) => {
        try {
            const response = await axios.post('/api/auth/login',{email,password})
            return response.data;
        } catch {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
        try {
            await axios.post('/api/auth/logout');
            return;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true;
            state.error = null

        })
        .addCase(signupUser.fulfilled, (state,action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        //for login
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state,action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(logoutUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.user = null; // Clear user on logout
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})


export default authSlice.reducer;
