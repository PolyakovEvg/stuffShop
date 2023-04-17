import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../features/api/apiSlice'
import classes from '../../styles/Category.module.css'

const Category = () => {
    const { id } = useParams()
    
    const defaultParams = {
        title: '',
        price_min: 0,
        price_max: 0,
        categoryId: ''
    }
    useEffect(()=>{
        if(!id) return
        setParams({...defaultParams, 'categoryId': id})
    }, [id])
    
    const a = useGetProductQuery(defaultParams)
    const [ params, setParams ] = useState(defaultParams)
  return (
    <>
    <section className={classes.wrapper}>
    <h2 className={classes.title}>Shoes</h2>
    <form className={classes.filters}>
        <input className={classes.filter}/>
        <input className={classes.filter}/>
        <input className={classes.filter}/>
    </form>

    </section>

    </>
      )
}

export default Category