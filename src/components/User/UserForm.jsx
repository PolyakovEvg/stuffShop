import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UserSignupForm from "./UserSignupForm";
import classes from "../../styles/User.module.css";
import { toggleForm } from "../../features/user/userSlice";

const UserForm = () => {
  const { showForm } = useSelector(({ user }) => user);
  const dispatch = useDispatch()

  return (
    <>
      {showForm ? (
        <div className={classes.overlay} onClick={()=>dispatch(toggleForm(false))}>
          <UserSignupForm />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserForm;
