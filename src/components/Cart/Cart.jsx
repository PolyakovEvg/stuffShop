import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "../../styles/Cart.module.css";
import SPRITE from "../../images/sprite.svg";
import { sumBy } from "../../utils";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../features/user/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const removeItem = (item) => {
    dispatch(removeItemFromCart(item.id));
  };
  const { cart } = useSelector(({ user }) => user);
  console.log(cart);

  const changeQuantity = (item, quantity) => {
    dispatch(addItemToCart({ ...item, quantity }));
  };
  return (
    <>
      <section className={classes.cart}>
        <h2 className={classes.title}>Your cart</h2>
        {!cart.length ? (
          <div className={classes.empty}>Cart is empty</div>
        ) : (
          <div className={classes.list}>
            {cart.map((item) => {
              const { id, quantity, title, category, images, price } = item;
              return (
                <div key={id} className={classes.item}>
                  <div
                    className={classes.image}
                    style={{ backgroundImage: `url(${images[0]})` }}
                  />
                  <div className={classes.info}>
                    <h3 className={classes.title}>{title}</h3>
                    <div className={classes.category}>{category.name}</div>
                  </div>
                  
                  <div className={classes.prices}>
                  <div className={classes.oldPrice}>{price}$</div>
                  <div className={classes.price}>
                    {Math.floor(price * 0.8)}$
                  </div>

                  </div>
                  
                  
                  
                  
                  <div className={classes.quantity}>
                    <div
                      className={classes.minus}
                      onClick={() =>
                        changeQuantity(item, Math.max(1, quantity - 1))
                      }
                    >
                      <svg>
                        <use xlinkHref={`${SPRITE}#minus`} />
                      </svg>
                    </div>
                    <span>{quantity}</span>
                    <div
                      className={classes.plus}
                      onClick={() => changeQuantity(item, quantity + 1)}
                    >
                      <svg>
                        <use xlinkHref={`${SPRITE}#plus`} />
                      </svg>
                    </div>
                  </div>

                  <div className={classes.price}>
                    {Math.floor(price * 0.8) * quantity}$
                  </div>


                  <div
                      className={classes.close}
                      onClick={() => removeItem(item)}
                    >
                      <svg>
                        <use xlinkHref={`${SPRITE}#close`} />
                      </svg>
                    </div>
                </div>
              );
            })}
          </div>
        )}
            <div className={classes.actions}>
              <div className={classes.total}>
                <span>
                  Total price:{" "}
                  {sumBy(cart.map(({ quantity, price }) => quantity * price))}$
                </span>
              </div>
              <button>Proceed to checkout</button>
            </div>
      </section>
    </>
  );
};

export default Cart;
