import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils";
import axios from "axios";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (payload, thunkAPI) => {
    try {
      const responce = await axios.post(`${API_URL}/users`, payload);
      return responce.data;
    } catch (e) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload, thunkAPI) => {
    try {
      const responce = await axios.post(`${API_URL}/auth/login`, payload);
      const login = await axios.get(`${API_URL}/auth/profile`, { headers: {
        "Authorization": `Bearer ${responce.data.access_token}`
      } });
      return login.data;
    } catch (e) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);
const addCurrentUser = (state, { payload }) => {
  state.currentUser = payload;}

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    cart: [],
    favourites: [],
    isLoading: false,
    formType: "signup",
    showForm: false,
  },
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];
      const foundItem = state.cart.find(({ id }) => id === payload.id);
      if (foundItem) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item;
        });
      } else {
        newCart.push({ ...payload, quantity: 1 });
      }
      state.cart = newCart;
    },
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload;
    },
    //   addItemToFavourites: (state, { payload }) => {
    //     let newFavourites = [...state.favourites]
    //     if(newFavourites.length){
    //         newFavourites.map((item)=>{
    //             item.id === payload.id ?  console.log('id одинаковые') : newFavourites.push(payload)
    //         })
    //     }else{
    //         newFavourites.push(payload)
    //     }
    //     console.log(newFavourites)
    //   }
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, addCurrentUser);
    builder.addCase(loginUser.fulfilled, addCurrentUser) 
  },
});

export const { addItemToCart, addItemToFavourites, toggleForm, toggleFormType} =
  userSlice.actions;

export default userSlice.reducer;
