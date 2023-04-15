import React, { useState } from "react";
import classes from "../../styles/User.module.css";
import { SPRITE } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, toggleForm, toggleFormType } from "../../features/user/userSlice";

const UserLoginForm = ({closeForm, toggleCurrentFormType}) => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    email:  "",
    password: "",
  });

  const [emptyInputs, setEmptyInputs] = useState({
    email: false,
    password: false,
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
      dispatch(loginUser(values))
      closeForm()
    }
    console.log(emptyInputs)
  }
  return (
    <>
      <div className={classes.wrapper} onClick={(e)=> e.stopPropagation()}>
        <div className={classes.close} onClick={() => closeForm}>
          <svg className={classes.icon}>
            <use xlinkHref={`${SPRITE}#close`} />
          </svg>
        </div>
        <div className={classes.title}>Login</div>
        <form className={classes.form}>
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
          <div className={classes.link} onClick={() => toggleCurrentFormType('signup')}>Create an account</div>
          <button type="submit" className={classes.submit} onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default UserLoginForm;
