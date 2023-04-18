import React from 'react'
import classes from '../styles/User.module.css'

const MyInput = ({value, type , name,  handleChange, isEmpty, required = true, placeholder=`Your ${name}`}) => {
  return (
    <div className={`${classes.group} ${isEmpty ? classes.error : ""}`}>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              autoComplete="off"
              onChange={handleChange}
              required = {required}
              value={value}
            ></input>
        </div>
  )
}

export default MyInput