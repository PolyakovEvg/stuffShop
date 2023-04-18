import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
    const { cart } = useSelector(({user}) => user)
    console.log(cart)
  return (
   <></>
  )
}

export default Cart