import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../features/api/apiSlice';
import Product from './Product';

const SingleProduct = () => {
    const { id } = useParams();
    const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({id})
    console.log(data)
    const navigate = useNavigate()

    useEffect(()=>{
      if(!isFetching && !isLoading && !isSuccess){
        navigate('/')
      }
    }, [isFetching, isLoading, isSuccess])
  return (
    <>
    { data &&
    <Product {...data}/>
  }

    </>
  )
}

export default SingleProduct