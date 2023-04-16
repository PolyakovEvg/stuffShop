import React, { useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import AppRouter from "../router/AppRouter";
import Sidebar from './Sidebar/Sidebar'
import classes from "../styles/index.css";
import { useDispatch } from "react-redux";
import { getCategories } from '../features/categories/categoriesSlice'
import { getProducts } from "../features/products/productsSlice";
import UserForm from "./User/UserForm";



const App = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
     dispatch(getCategories())
     dispatch(getProducts())
     
  }, [dispatch])

  return (
    <div className="app">
      <Header />
      <UserForm/>
      <div className="container">
        <Sidebar />
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
};
export default App;
