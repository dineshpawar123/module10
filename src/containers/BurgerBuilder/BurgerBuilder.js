import React, { Component } from "react";
import Aux1 from "../../hoc/Aux1/Aux1";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
  salad: 20,
  meat: 40,
  bacon: 10,
  cheese: 30,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 20,
    purchasable: false,
    purchasing: false,
    loading: false,
    error:false,
  };
  componentDidMount() {
    axios
      .get(
        "https://react-burger-builder-2735d-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch(error=>{
        this.setState({error:true})
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
  purchasHandler = () => {
    this.setState({ purchasing: true });
  };
  purchasCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchasContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredient: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "dinesh pawar",
        addrress: {
          street: "main",
          zipCode: 12345,
          country: "India",
        },
        email: "dd23@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
        console.log(response);
      })
      .catch((error) => {
        this.setState({ loading: false, purchasing: false });
        console.log(error);
      });
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary=null;
   
    
    let burger = this.state.error?<p>ingredient can't be loaded!</p>:<Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux1>
          <Burger ingredient={this.state.ingredients} />

          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            purchasable={this.state.purchasable}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            ordered={this.purchasHandler}
          />
        </Aux1>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelld={this.purchasCancelHandler}
          purchaseContinued={this.purchasContinueHandler}
          price={this.state.totalPrice}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }
    //this will return array of ingredient like {salad:true,meat:false,bacon:true...}
    return (
      <Aux1>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchasCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux1>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
