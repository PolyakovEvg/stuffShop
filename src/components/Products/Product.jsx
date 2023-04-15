import React, { useEffect, useState } from "react";
import classes from "../../styles/Product.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../features/user/userSlice";
const SIZES = [4, 4.5, 5];

const Product = (item) => {
  const { title, images, price, description, id } = item
  
  
  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setCurrentSize] = useState();

  const dispatch = useDispatch();
  const addToCart = () => dispatch(addItemToCart(item));

  useEffect(() => {
    if (!images) return;
    setCurrentImage(images[0]);
  }, []);

  return (
    <section className={classes.product}>
      <div className={classes.images}>
        <div
          className={classes.current}
          style={{ background: `url(${currentImage})` }}
        />
        <div className={classes.imagesList}>
          {images.map((image, i) => (
            <div
              key={i}
              className={classes.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={(e) => {
                setCurrentImage(image);
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className={classes.info}>
        <h1 className={classes.title}>{title}</h1>
        <div className={classes.price}>{price}$</div>
        <div className={classes.color}>
          <span>Color:</span>
        </div>
        <div className={classes.sizes}>
          <span>Sizes:</span>
          {SIZES.map((size) => (
            <div
              onClick={() => setCurrentSize(size)}
              className={`${classes.size} ${
                currentSize === size ? classes.active : null
              }`}
              key={size}
            >
              {size}
            </div>
          ))}
          <div className={classes.list}></div>
        </div>
        <p className={classes.description}>{description}</p>
        <div className={classes.actions}>
          <button className={classes.add} disabled={!currentSize} onClick={() => addToCart()}>
            Add to card
          </button>
          <button className={classes.favourite} >
            Add to favourites
          </button>
        </div>

        <div className={classes.bottom}>
          <div className={classes.perchase}>Perchased {id}</div>
          <Link to="/">Return to home</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
