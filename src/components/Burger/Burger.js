import React from "react";

import classes from "./Burger.css";

import BurgerIngrediant from "./BurgerIngrediant/BurgerIngrediant";

const burger = (props) => {
  let transformedIngrediants = Object.keys(props.ingrediants)
    .map((igkey) => {
      return [...Array(props.ingrediants[igkey])].map((_, i) => {
        return <BurgerIngrediant key={igkey + i} type={igkey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngrediants.length === 0) {
    transformedIngrediants = <p>Please Start Adding Ingrediants</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngrediant type="bread-top" />
      {transformedIngrediants}
      <BurgerIngrediant type="bread-bottom" />
    </div>
  );
};

export default burger;
