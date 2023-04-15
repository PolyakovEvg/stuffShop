import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_URL } from "../../utils"
import axios from "axios"

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, thunkAPI) => {
        try{
            const responce = await axios.get(`${API_URL}/products`)
            return responce.data

        }catch(e){
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        filtered: [],
        isLoading: false,
        related: [],
    },
    reducers: {
        filrerByPrice: (state, { payload }) => {
            state.filtered = state.list.filter(({ price }) => price < payload)
        },
        getRelatedProducts: (state, {payload}) =>{

            const list = state.filtered = state.list.filter(({ category: {id} }) => id === payload)
            state.related = list
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, {payload}) =>{
            state.isLoading = true
            state.list = payload
        })
        builder.addCase(getProducts.fulfilled, (state, {payload}) =>{
            state.list = payload
            state.isLoading = false
        })
        builder.addCase(getProducts.rejected, (state, {payload}) =>{
            state.isLoading = false
            console.log('Ошибка ответа от API')
        })
    }
})

export const { filrerByPrice, getRelatedProducts } = productsSlice.actions;

export default productsSlice.reducer;