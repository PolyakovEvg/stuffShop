import React from 'react'
import classes from '../../styles/Footer.module.css'

const Footer = () => {
  return (
    <section className={classes.footer}>
     <div className={classes.logo}>
        <Link to="/">
          <img src={LOGOIMG} alt="Stuff"></img>
        </Link>
      </div>
    </section>
  )
}

export default Footer;