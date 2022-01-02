import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom" //new
import Main from './Main' //new
import { clearSelectedFlower, checkBasket } from "../store";


const Nav = (props) => {
  return (
     <div>
        <h1>    
          The Flower Shop
          <button onClick={() => {
            props.checkBasket(0)
            props.clearSelectedFlower()}} id="home_button"> Home </button>
          <button id="order_button" onClick={() => props.checkBasket(1)}> Order </button>
        </h1>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearSelectedFlower: () => dispatch(clearSelectedFlower()),
    checkBasket: (basket) => dispatch(checkBasket(basket))
  };
};

export default connect(null, mapDispatchToProps)(Nav);