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

export const updateUser = createAsyncThunk(
  "user/loginUser",
  async (payload, thunkAPI) => {
    try {
      const resoponse = await axios.put(`${API_URL}/users/${payload.id}`, payload);
      return resoponse.data;
    } catch (e) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/updateUser",
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
    removeItemFromCart: (state, {payload }) => {
      state.cart = state.cart.filter(({id}) => id !== payload)
    },
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload;
    },
      addItemToFavourites: (state, { payload }) => {
        let newFavourites = [...state.favourites]
        if(newFavourites.length){
          !newFavourites.some(({id})=> id === payload.id) && newFavourites.push({...payload})
        } else{
          newFavourites.push({...payload})

        }
        console.log(payload.id)
        console.log(newFavourites)
        state.favourites = newFavourites
      }
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, addCurrentUser);
    builder.addCase(loginUser.fulfilled, addCurrentUser) 
    builder.addCase(updateUser.fulfilled, addCurrentUser) 
  },
});

export const { addItemToCart, addItemToFavourites, toggleForm, toggleFormType, removeItemFromCart} =
  userSlice.actions;

export default userSlice.reducer;
