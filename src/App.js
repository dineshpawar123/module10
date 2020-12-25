import "./App.css";
import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Component } from "react";
class App extends Component {
  
  render(){
    return (
      <div className="App">
        <Layout>
           <BurgerBuilder />
         
        </Layout>
      </div>
    );

  }
  
  
}
 


export default App;
