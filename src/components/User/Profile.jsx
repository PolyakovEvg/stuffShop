import React, { useEffect } from "react";
import classes from "../../styles/Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm, updateUser } from "../../features/user/userSlice";
import MyInput from '../../UI/MyInput'
import { useState } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);
  const openForm = () => dispatch(toggleForm(true));
  const closeForm = () => dispatch(toggleForm(false));

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
      dispatch(updateUser(values));
      closeForm();
    }
  };

  useEffect(() => {
    if (!currentUser) {
      openForm();
    } else {
      setValues(currentUser)
    }
  }, [currentUser]);
  return (
    <>
    
      <div className={classes.profile}>
        {!currentUser ? (
          <h1> You need to log in</h1>
        ) : (
          <form className={classes.form}>
            <MyInput
              value={values.name}
              type="name"
              handleChange={handleChange}
            />
               <MyInput
              value={values.email}
              type="email"
              handleChange={handleChange}
            />
               <MyInput
              value={values.password}
              type="password"
              handleChange={handleChange}
            />
               <MyInput
              value={values.avatar}
              type="avatar"
              handleChange={handleChange}
            />
            <button onClick={handleSubmit}>Update</button>
            </form>
        )}
      </div>
    </>
  );
};

export default Profile;
