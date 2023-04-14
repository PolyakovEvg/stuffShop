import React from "react";
import classes from "../../styles/Home.module.css";
import BG from "../../images/computer.png";

const Poster = () => {
  return (
    <div className={classes.home}>
      <div className={classes.title}> BIG SALE 20% </div>
      <div className={classes.product}>
        <div className={classes.text}>
          <div className={classes.subtitle}>The most powerful gaming PC</div>
          <h1 className={classes.head}> WITH AMAZING <br/> RTX 4090</h1>
          <button type="button" className={classes.button}>
            Shop Now
          </button>
        </div>
        <div className={classes.image}>
          <img src={BG} alt="4090 ti"></img>
        </div>
      </div>
    </div>
  );
};

export default Poster;
