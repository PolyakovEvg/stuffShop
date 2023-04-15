import React, { useState } from "react";
import classes from "../../styles/User.module.css";
import { SPRITE } from "../../utils";
import { createUser  } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

const UserSignupForm = ({closeForm, toggleCurrentFormType }) => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [emptyInputs, setEmptyInputs] = useState({
    name: false,
    email: false,
    password: false,
    avatar: false,
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    const emptyFields = Object.entries(values).filter(([key, value]) => !value);
    if (emptyFields.length) {
      const newErrors = emptyFields.reduce((acc, [key]) => {
        return { ...acc, [key]: true };
      }, {});
      setEmptyInputs(newErrors);
    } else {
      dispatch(createUser(values))
      closeForm()
    }
  }
  return (
    <>
      <div className={classes.wrapper} onClick={(e)=> e.stopPropagation()}>
        <div className={classes.close} onClick={() => closeForm}>
          <svg className={classes.icon}>
            <use xlinkHref={`${SPRITE}#close`} />
          </svg>
        </div>
        <div className={classes.title}>Sign up</div>
        <form className={classes.form}>
        <div className={`${classes.group} ${emptyInputs.name ? classes.error : ""}`}>
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
          <div className={`${classes.group} ${emptyInputs.email ? classes.error : ""}`}>
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
          <div className={`${classes.group} ${emptyInputs.password ? classes.error : ""}`}>
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
          <div className={`${classes.group} ${emptyInputs.avatar ? classes.error : ""}`}>
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
          <div className={classes.link} onClick={() => toggleCurrentFormType('login')}>I already have an account</div>
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
