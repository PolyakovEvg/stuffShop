import React from 'react'
import classes from '../styles/User.module.css'

const MyInput = ({value, type , handleChange, isEmpty, placeholder=`Your ${type}`}) => {
  return (
    <div className={`${classes.group} ${isEmpty ? classes.error : ""}`}>
            <input
              type={type}
              name={type}
              placeholder={placeholder}
              autoComplete="off"
              onChange={handleChange}
              required
              value={value}
            ></input>
        </div>
  )
}

export default MyInput