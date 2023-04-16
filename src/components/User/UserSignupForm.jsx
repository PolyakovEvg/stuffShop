import React, { useState } from "react";
import classes from "../../styles/User.module.css";
import { SPRITE } from "../../utils";
import { createUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import MyInput from "../../UI/MyInput";

const UserSignupForm = ({ closeForm, toggleCurrentFormType }) => {
  const dispatch = useDispatch();
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


  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyFields = Object.entries(values).filter(([key, value]) => !value);
    if (emptyFields.length) {
      const newErrors = emptyFields.reduce((acc, [key]) => {
        return { ...acc, [key]: true };
      }, {});
      setEmptyInputs(newErrors);
    } else {
      dispatch(createUser(values));
      closeForm();
    }
  };
  return (
    <>
      <div className={classes.wrapper} onClick={(e) => e.stopPropagation()}>
        <div className={classes.close} onClick={() => closeForm()}>
          <svg className={classes.icon}>
            <use xlinkHref={`${SPRITE}#close`} />
          </svg>
        </div>
        <div className={classes.title}>Sign up</div>
        <form className={classes.form}>
          <MyInput
            isEmpty={emptyInputs.name}
            value={values.name}
            handleChange={handleChange}
            type="name"
          />
          <MyInput
            isEmpty={emptyInputs.email}
            value={values.email}
            handleChange={handleChange}
            type="email"
          />
          <MyInput
            isEmpty={emptyInputs.password}
            value={values.password}
            handleChange={handleChange}
            type="password"
          />
          <MyInput
            isEmpty={emptyInputs.avatar}
            value={values.avatar}
            handleChange={handleChange}
            type="avatar"
          />
          <div
            className={classes.link}
            onClick={() => toggleCurrentFormType("login")}
          >
            I already have an account
          </div>
          <button
            type="submit"
            className={classes.submit}
            onClick={handleSubmit}
          >
            {" "}
            Create an account
          </button>
        </form>
      </div>
    </>
  );
};

export default UserSignupForm;
