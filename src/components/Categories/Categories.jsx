import React from "react";
import classes from "../../styles/Categories.module.css";
import { Link } from "react-router-dom";

const Categories = ({ categories = [], title }) => {
  return (
    <section className={classes.section}>
      {title ? <h2 className={classes.title}>{title}</h2> : ""}
      <div className={classes.list}>
        {categories.map(({ id, image, name }) => (
          <Link to={`/categories/${id}`} key={id} className={classes.item}>
            <div
              className={classes.image}
              style={{ background: `url(${image})` }}
            ></div>
            <h3 className={classes.title}>{name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
