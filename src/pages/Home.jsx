import React, { useEffect } from "react";
import Poster from "../components/Poster/Poster";
import Products from "../components/Products/Products";
import { useSelector } from "react-redux";
import Categories from "../components/Categories/Categories";
import Bunner from "../components/Banner/Bunner";
import { filrerByPrice } from "../features/products/productsSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { products: {list, filtered}, categories } = useSelector((state) => state);
  useEffect(()=>{
    if(list){
     dispatch(filrerByPrice(100))
    }
    return
  },[dispatch, list])

  return (
    <>
      <Poster />
      <Products products={list} amount={5} title="Trending" />
      <Categories categories={categories.list} title= 'Categories'  />
      <Bunner/>
      <Products products={ filtered } amount={5} title='Less then 100' />
    </>
  );
};

export default Home;
