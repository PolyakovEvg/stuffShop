import React, { useState } from "react";
import classes from "../../styles/User.module.css";
import { SPRITE } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  toggleForm,
  toggleFormType,
} from "../../features/user/userSlice";
import MyInput from "../../UI/MyInput";

const UserLoginForm = ({ closeForm, toggleCurrentFormType }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [emptyInputs, setEmptyInputs] = useState({
    email: false,
    password: false,
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyFields = Object.entries(values).filter(([key, value]) => !value);
    if (emptyFields.length) {
      const newErrors = emptyFields.reduce((acc, [key]) => {
        return { ...acc, [key]: true };
      }, {});
      setEmptyInputs(newErrors);
    } else {
      dispatch(loginUser(values));
      closeForm();
    }
    console.log(emptyInputs);
  };
  return (
    <>
      <div className={classes.wrapper} onClick={(e) => e.stopPropagation()}>
        <div className={classes.close} onClick={() => closeForm}>
          <svg className={classes.icon}>
            <use xlinkHref={`${SPRITE}#close`} />
          </svg>
        </div>
        <div className={classes.title}>Login</div>
        <form className={classes.form}>
          <MyInput
            isEmpty={emptyInputs.email}
            value={values.email}
            handleChange={handleChange}
            type="email"
          ></MyInput>
          <MyInput
            isEmpty={emptyInputs.password}
            value={values.password}
            handleChange={handleChange}
            type="password"
          ></MyInput>
          <div
            className={classes.link}
            onClick={() => toggleCurrentFormType("signup")}
          >
            Create an account
          </div>
          <button
            type="submit"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default UserLoginForm;
