import React from "react";
import classes from "../../styles/Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {

  const { list , isLoading }     = useSelector(( {categories}) => categories);

  return (
    <div className={classes.sidebar}>
      <div className={classes.title}>CATEGORIES</div>
      <nav>
        <ul className={classes.menu}>
          {  !isLoading ? (list.slice(0,5).map(({id, name}) => (
            <li key={id}>
              <NavLink 
              className={( {isActive} ) => `${classes.link} ${isActive ? classes.active : null}`}
               to={`/categories/${id}`}> {name} </NavLink>
            </li>
          ))) : <div> Loading</div>}
        </ul>
      </nav>

      <div className={classes.footer}>
        <a href="!#" className={classes.link}>
          Help
        </a>
        <a href="!#" className={classes.link}>
          Terms and Conditions
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
