import React, { useEffect, useState } from "react";
import classes from "../../styles/Header.module.css";
import { Link } from "react-router-dom";
import { LOGOIMG } from "../../utils";
import { SPRITE } from "../../utils";
import AVATAR from "../../images/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../features/user/userSlice";

const Header = () => {
  const {cart, favourites} = useSelector(({user})=> user)
  const getCount = (arr) => arr.reduce((sum, item)=> sum + item.quantity, 0)
  const { currentUser } = useSelector(({user}) => user)
  const dispatch = useDispatch()
  
  const [values, setValues] = useState({name: 'Guest', avatar: AVATAR})
  useEffect(()=>{
    if(!currentUser) return
    setValues(currentUser)
  },[currentUser])

  const handleClick =()=>{
    if(!currentUser) dispatch(toggleForm(true))
  }

  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">
          <img src={LOGOIMG} alt="Stuff"></img>
        </Link>
      </div>

      <div className={classes.info}>
        <div className={classes.user} onClick={handleClick}>
          <div
            className={classes.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          />
          <div className={classes.username}> {values.name}</div>
        </div>

        <form className={classes.form__search}>
          <svg className={classes.icon}>
            <use xlinkHref={`${SPRITE}#search`} />
          </svg>
          <input
            placeholder="Search ..."
            className={classes.input}
            autoComplete="off"
            onChange={(e) => console.log(e.target.value)}
          />
          <div className="box"></div>
        </form>

        <div className={classes.account}>
          <Link to="/" className={classes.favourites}>
            <svg className={classes["icon-fav"]}>
              <use xlinkHref={`${SPRITE}#heart`} />
            </svg>
            <span className={classes.count}></span>
          </Link>
          <Link to="/" className={classes.cart}>
            <svg className={classes["icon-fav"]}>
              <use xlinkHref={`${SPRITE}#bag`} />
            </svg>
            <span className={classes.count}>{ getCount(cart) }</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
