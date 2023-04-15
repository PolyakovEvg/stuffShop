import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_URL } from "../../utils"
import axios from "axios"

export const getuser = createAsyncThunk(
    'user/getuser',
    async (_, thunkAPI) => {
        try{
            const responce = await axios.get(`${API_URL}/user`)
            return responce.data

        }catch(e){
            console.log(err)
            return thunkAPI.rejectWithValue(err)
        }
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: [],
        cart: [],
        isLoading: false,
    },
    reducers: {
      addItemToCart: (state, { payload }) => {
        let newCart = [...state.cart]
        const foundItem = state.cart.find(({id}) => id === payload.id)
        if(foundItem){
            newCart = newCart.map((item) =>{
                return item.id === payload.id ? {...item, quantity: payload.quantity || item.quantity +1 } : item
            })
        }else{
            newCart.push({...payload, quantity: 1})
        }
        state.cart = newCart
      }
    },
    extraReducers: (builder) => {
        // builder.addCase(getuser.pending, (state, {payload}) =>{
        //     state.isLoading = true
        //     state.list = payload
        // })
        // builder.addCase(getuser.fulfilled, (state, {payload}) =>{
        //     state.list = payload
        //     state.isLoading = false
        // })
        // builder.addCase(getuser.rejected, (state, {payload}) =>{
        //     state.isLoading = false
        //     console.log('Ошибка ответа от API')
        // })
    }
})

export const { addItemToCart } = userSlice.actions;

export default userSlice.reducer;