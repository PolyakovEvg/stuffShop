import React from "react";
import classes from "../../styles/Header.module.css";
import { Link } from "react-router-dom";
import LOGOIMG from "../../images/logo.svg";
import AVATAR from "../../images/avatar.jpg";
import SPRITE from "../../images/sprite.svg";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">
          <img src={LOGOIMG} alt="Stuff"></img>
        </Link>
      </div>

      <div className={classes.info}>
        <div className={classes.user}>
          <div
            className={classes.avatar}
            style={{ backgroundImage: `url(${AVATAR})` }}
          />
          <div className={classes.username}> Dear guest</div>
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
          </Link>
          <Link to="/" className={classes.cart}>
            <svg className={classes["icon-fav"]}>
              <use xlinkHref={`${SPRITE}#bag`} />
            </svg>
            <span className={classes.count}>2</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
