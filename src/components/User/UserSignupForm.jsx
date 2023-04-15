import React, { useState } from "react";
import classes from "../../styles/User.module.css";
import { SPRITE } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../features/user/userSlice";

const UserSignupForm = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    const isEmpty = Object.values(values).every(val => val)
    if(isEmpty) return
  }

  return (
    <>
      <div className={classes.wrapper} onClick={(e)=> e.stopPropagation()}>
        <div className={classes.close} onClick={() => dispatch(toggleForm(false))}>
          <svg className={classes.icon}>
            <use xlinkHref={`${SPRITE}#close`} />
          </svg>
        </div>
        <div className={classes.title}>Sign up</div>
        <form className={classes.form}>
          <div className={classes.group}>
            <input
              type="name"
              name="name"
              placeholder="Your name"
              autoComplete="off"
              onChange={handleChange}
              required
              value={values.name}
            ></input>
          </div>
          <div className={classes.group}>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              autoComplete="off"
              onChange={handleChange}
              required
              value={values.email}
            ></input>
          </div>
          <div className={classes.group}>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              autoComplete="off"
              onChange={handleChange}
              required
              value={values.password}
            ></input>
          </div>
          <div className={classes.group}>
            <input
              type="avatar"
              name="avatar"
              placeholder="Your avatar"
              autoComplete="off"
              onChange={handleChange}
              required
              value={values.avatar}
            ></input>
          </div>
          <div className={classes.link}>I already have an account</div>
          <button type="submit" className={classes.submit} onClick={handleSubmit}>
            {" "}
            Create an account
          </button>
        </form>
      </div>
    </>
  );
};

export default UserSignupForm;
