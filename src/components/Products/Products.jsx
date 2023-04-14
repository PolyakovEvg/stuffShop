import React from "react";
import classes from "../../styles/Products.module.css";
import { Link } from "react-router-dom";

const Products = ({ title, products = [], style = {}, amount }) => {
  products = products.slice(0, 5);
  return (
    <section className={classes.products}>
        {title && <h2>{title}</h2>}
      <div className={classes.list}>
        {products.map(
          ({ id, images, title, category: { name: cat }, price }) => (
            <Link to={`/products/${id}`} className={classes.product} key={id}>
              <div
                className={classes.image}
                style={{ background: `url(${images[0]}})` }}
              />
              <div className={classes.wrapper}>
                <h3 className={classes.title}>{title}</h3>
                <div className={classes.cat}>{cat}</div>
                <div className={classes.info}>
                  <div className={classes.price}>
                    {Math.floor(price * 0.8)}$
                  </div>
                  <div className={classes.oldPrice}>{price}$</div>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
};

export default Products;
