import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_URL } from "../../utils"
import axios from "axios"

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, thunkAPI) => {
        try{
            const responce = await axios.get(`${API_URL}/categories`)
            return responce.data

        }catch(e){
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)


const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        list: []
    },
    isLoading: false,
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state, {payload}) =>{
            state.isLoading = true
            state.list = payload
        })
        builder.addCase(getCategories.fulfilled, (state, {payload}) =>{
            state.list = payload.slice(0,5)
            state.isLoading = false
        })
        builder.addCase(getCategories.rejected, (state, {payload}) =>{
            state.isLoading = false
            console.log('Ошибка ответа от API')
        })
    }
})

export default categoriesSlice.reducer;