import React, { useEffect, useState } from "react";
import classes from "../../styles/Header.module.css";
import { Link } from "react-router-dom";
import { LOGOIMG, sumBy } from "../../utils";
import { SPRITE } from "../../utils";
import AVATAR from "../../images/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Header = () => {
  const { cart, favourites } = useSelector(({ user }) => user);

  const { currentUser } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const [values, setValues] = useState({ name: "Guest", avatar: AVATAR });
  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
  };

  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useGetProductsQuery({ title: searchValue });

  return (
    <>
      {" "}
      <div className={classes.header}>
        <div className={classes.logo}>
          <Link to="/">
            <img src={LOGOIMG} alt="Stuff"></img>
          </Link>
        </div>

        <div className={classes.info}>
          <Link to="/profile">
            <div className={classes.user} onClick={handleClick}>
              <div
                className={classes.avatar}
                style={{ backgroundImage: `url(${values.avatar})` }}
              />
              <div className={classes.username}> {values.name}</div>
            </div>
          </Link>
          <form className={classes.form__search}>
            <svg className={classes.icon}>
              <use xlinkHref={`${SPRITE}#search`} />
            </svg>
            <input
              placeholder="Search ..."
              className={classes.input}
              autoComplete="off"
              value={searchValue}
              onChange={({ target }) => setSearchValue(target.value)}
            />
            <div className="box"></div>

            {searchValue && (
              <div className={classes.box}>
                {isLoading
                  ? "Loading"
                  : !data.length
                  ? "No results"
                  : data.map(({ title, images, id }) => (
                      <Link
                        className={classes.item}
                        key={id}
                        to={`products/${id}`}
                        onClick={() => setSearchValue("")}
                      >
                        <div
                          className={classes.image}
                          style={{ backgroundImage: `url(${images[0]}})` }}
                        ></div>
                        <div className={classes.title}>{title}</div>
                      </Link>
                    ))}
              </div>
            )}
          </form>

          <div className={classes.account}>
            <Link to="/" className={classes.favourites}>
              <svg className={classes["icon-fav"]}>
                <use xlinkHref={`${SPRITE}#heart`} />
              </svg>
              <span
                className={favourites.length ? classes.count : classes.hidden}
              >
                {favourites.length}
              </span>
            </Link>
            <Link to="/cart" className={classes.cart}>
              <svg className={classes["icon-fav"]}>
                <use xlinkHref={`${SPRITE}#bag`} />
              </svg>
              <span className={cart.length ? classes.count : classes.hidden}>
                {sumBy(cart.map(({ quantity }) => quantity))}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
