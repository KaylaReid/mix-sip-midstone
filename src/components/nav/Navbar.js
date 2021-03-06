import React, { Component } from "react";
import CupLogo from "../images/cupLogo.png";
import { Button } from "semantic-ui-react";
import "./navbar.css";



 export default class Navbar extends Component {

    handleLogout = () => {
        sessionStorage.removeItem("user")
        this.props.history.push("/login")
    }

    getFirstName = () => {
        let user = JSON.parse(sessionStorage.getItem("user"))[0]
        let firstName = user.fullName.split(" ")
        return firstName[0]
    }

     render(){
         return(
             <div id="navbar">
                <div className="nav-left">
                    <img src={CupLogo} alt="mix&amp;siplogo" id="navbar-logo"/>
                </div>
                <div id="nav-middle">
                    <h4 className="welcome capitalize font">welcome to your drink collection <span className="name-font">{this.getFirstName()}!</span></h4>
                </div>
                <div className="nav-right">
                    <Button id="logout-button" size="tiny" className="font text-shadow box-shadow-logout" onClick={this.handleLogout}>Logout</Button>
                </div>
             </div>
         )
     }
 }