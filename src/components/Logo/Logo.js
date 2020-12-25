import React from "react";
import bugerLogo from "../../assets/images/burger-logo.png";
import "./Logo.css";
const logo=(props)=>(
    <div className="Logo" style={{height:props.height}}>
        <img src={bugerLogo} alt="myBurger"/>
    </div>
);
export default logo;