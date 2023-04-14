import React from "react";
import classes from "../../styles/Footer.module.css";
import { Link } from "react-router-dom";
import { LOGOIMG } from "../../utils";
import { SPRITE } from "../../utils";

const Footer = () => {
  return (
    <section className={classes.footer}>
      <div className={classes.logo}>
        <Link to="/">
          <img src={LOGOIMG} alt="Stuff"></img>
        </Link>
      </div>
      <div className={classes.rights}>
        Developed by{" "}
        <a href="https://github.com/PolyakovEvg" target="blank">
          E. Polyakov
        </a>
      </div>
      <div className={classes.socials}>
        <a href="https://github.com/PolyakovEvg" target="blank">
          <svg className={classes.icon}>
            <use xlinkHref={`${SPRITE}#instagram`} />
          </svg>
        </a>
        <a href="https://github.com/PolyakovEvg" target="blank">
          <svg className={classes.icon}>
            <use xlinkHref={`${SPRITE}#facebook`} />
          </svg>
        </a>
        <a href="https://github.com/PolyakovEvg" target="blank">
          <svg className={classes.icon}>
            <use xlinkHref={`${SPRITE}#youtube`} />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Footer;
