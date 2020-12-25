import React, { Component } from "react";
import Aux1 from "../../../hoc/Aux1/Aux1";
import Button from "../../UI/Button/Button";
class OrederSummary extends Component{
  componentDidUpdate(){
    console.log("[OrderSummary]will update");
  }
  render(){
    const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return(
      <Aux1>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Price:{this.props.price}</strong>
       
      </p>
      <p>Continue to Checkout</p>
      <Button btnType="Danger" clicked={this.props.purchaseCancelld}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={this.props.purchaseContinued}>
        CONTINUE
      </Button>
    </Aux1>
    );
  }
} 

export default OrederSummary;
