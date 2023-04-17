import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import classes from "../../styles/Category.module.css";
import Products from "../Products/Products";
import { useSelector } from "react-redux";
import MyInput from '../../UI/MyInput'

const Category = () => {
  const defaultParams = {
    title: "",
    price_min: 0,
    price_max: 0,
    categoryId: "",
  };
  const { id } = useParams();
  const [params, setParams] = useState(defaultParams);
  const { list } = useSelector(({ categories }) => categories);
  const [category, setCategory] = useState('')
  
  useEffect(()=>{
    if(!list || !id) return
    setCategory(list.find((item) => item.id === +params.categoryId))
  },[list])

  
  const { data, isLoading, isSuccess } = useGetProductsQuery(params);
  console.log(data)
  useEffect(() => {
    if (!id) return;
    setParams({ ...defaultParams, categoryId: id });
  }, [id]);

  const handleChange = ({target: {name, value}}) =>{
    setParams({...params, [name]: value})
  }

  return (
    <>
      <section className={classes.wrapper}>
        <h2 className={classes.title}>Shoes</h2>
        <form className={classes.filters}>
        <MyInput
            onChange={handleChange}
            placeholder='Enter product name'
        />
         <MyInput
            placeholder='Min price'
            handleChange={handleChange}
        />
         <MyInput
            placeholder='Max price'
            handleChange={handleChange}
        />
        </form>
        {isLoading ? (
          <div>Loading...</div>
        ) : !isSuccess || !data.length ? (
          <span>No results</span>
        ) : (
          <Products products={data} amount={data.length} title={''}></Products>
        )}
      </section>
    </>
  );
};

export default Category;
