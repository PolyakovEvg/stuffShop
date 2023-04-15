import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../features/api/apiSlice';
import Product from './Product';
import Products from './Products';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedProducts } from '../../features/products/productsSlice';

const SingleProduct = () => {
    const { id } = useParams();
    const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({id})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {related} = useSelector(( {products}) => products)
    
    useEffect(()=>{
      if(!isFetching && !isLoading && !isSuccess){
        navigate('/')
      }
    }, [isFetching, isLoading, isSuccess])
    
    useEffect(()=>{
      if(data){
        dispatch(getRelatedProducts(data.category.id))
      }
    },[dispatch, data])

  return (
    <>
    { data &&
    <Product {...data}/>
  }
    <Products  products={related} amount={5} title='Related products'/>

    </>
  )
}

export default SingleProduct