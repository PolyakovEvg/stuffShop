import React from 'react'
import classes from '../../styles/Home.module.css'
import SALE_IMG from '../../images/sale20.png'

const Bunner = () => {
  return (
    <section className={classes.banner}>
    <div className={classes.left}>
    <div className={classes.content}>AMAZING SALE</div>
    <button className={classes.more}>See more</button>
    </div>
    <div className={classes.right}>
    <h4 className={classes.discount}>Save up to <span>20%</span> off</h4>
    </div>
    </section>
  )
}

export default Bunner