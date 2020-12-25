import React from "react";
import Aux1 from "../Aux1/Aux1";
import "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { Component } from "react";

class Layout extends Component {
  state={
    showSideDrawer:false
  }
  SideDrawerClosedHandler=()=>{
    this.setState({showSideDrawer:false});
  }
  SidedrawerToggleHandler=()=>{
   
    this.setState((prevState)=>{
      return {showSideDrawer:!prevState.showSideDrawer};
    })
  }
  render() {
    return (
      <Aux1>
        <Toolbar drawerToggleClicked={this.SidedrawerToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler} />

        <main className="Content">{this.props.children}</main>
      </Aux1>
    );
  }
}

export default Layout;
