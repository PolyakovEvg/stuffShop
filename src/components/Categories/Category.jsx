import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import classes from "../../styles/Category.module.css";
import Products from "../Products/Products";
import { useSelector } from "react-redux";
import MyInput from "../../UI/MyInput";

const Category = () => {
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories);
  
  const defaultValues = {
    title: "",
    price_min: '',
    price_max: '',
  };
  
  const defaultParams = {
    ...defaultValues,
    categoryId: '',
    offset: 0,
    limit: 10,
  };

  const [isEndData, setEndData] = useState(false);
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);

  
  const { data = [], isLoading, isSuccess } = useGetProductsQuery(params);

  useEffect(() => {
    if (!id) return;

    setValues(defaultValues)
    setItems([])
    setEndData(false)
    setParams({ ...defaultParams, categoryId: id });
  }, [id]);

  console.log(category)
  useEffect(() => {
    if (!list || !id) return;
    if(list.find(item => item.id === +id)){
      const category = list.find((item) => item.id === id * 1);
      setCategory(category)
    }
  }, [list, id]);

  useEffect(() => {
    if (isLoading) return;
    const products = Object.values(data)
    if(!products.length) return setEndData(true)
    setItems((_items) => [...items, ...products]);
  }, [data]);

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([])
    setEndData(false)
    setParams({ ...params, ...values });
  };
  return (
    <>
      <section className={classes.wrapper}>
        <h2 className={classes.title}>{category ? category.name : ''}</h2>
        <form className={classes.filters} onSubmit={handleSubmit}>
          <div className={classes.filter}>
            <span className={classes}>Product name</span>
            <MyInput
              handleChange={handleChange}
              name="title"
              type="title"
              placeholder="Product name"
              value={values.title}
              required={false}
            />
          </div>
          <div className={classes.filter}>
            <span className={classes}>Price from</span>
            <MyInput
              placeholder="0"
              name="price_min"
              type="number"
              handleChange={handleChange}
              value={values.price_min}
              required={false}
            />
          </div>
          <div className={classes.filter}>
            <span className={classes}>Price to</span>
            <MyInput
              placeholder="0"
              name="price_max"
              type="number"
              handleChange={handleChange}
              value={values.price_max}
              required={false}
            />
          </div>
          <div className={classes.form__info} onClick={handleSubmit}> Press 'Enter' for search </div>

          <button type="submit" hidden></button>
        </form>
        {isLoading ? (
          <div>Loading...</div>
        ) : !isSuccess || !items.length ? (
          <span >No results</span>
        ) : (
          <Products
            products={items}
            amount={items.length}
            title={""}
          ></Products>
        )}
        {!isEndData && (
          <div className={classes.more}>
            <button
              onClick={() =>
                setParams({ ...params, offset: params.offset + params.limit })
              }
            >
              More
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Category;
