import React, { Component, useState, useEffect } from "react";
import "./css/App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import firebase from "firebase/app";
import dotenv from "dotenv";
import usermodel from "./data/user";
import loginsrvc from "./loginsrvc";

dotenv.config();

/***************
 * developer: Vivek Sharma
 * date : 17-jun-21
 * for sudoky program
 ***************/

export default class Appheader extends Component {
  loginService = new loginsrvc();

  constructor(props) {
    dotenv.config();

    super(props);
    this.state = {
      showlogin: true,
      showlogout: false,
      username: "",
    };
    this.setState({ username: this.loginService.userdata.displayname });
  } //end of constructor

  setLoginBtnStateOn = () => {
    this.setState({ showlogin: true });
  };
  setLoginBtnStateOff = () => {
    this.setState({ showlogin: false });
  };

  retUname = () => {
    //username
    //console.log("local storage " + localStorage.getItem("userName"));
    return localStorage.getItem("userName");
    // return this.loginService.getLoginUserDtl();
  };

  retButton = () => {
    //return login button if this.state.showlogin is true else return logout button
    //console.log("Return button is " + this.loginService.isloggedin);
    if (!this.loginService.getIsLogin()) {
      return (
        <Button
          variant="outline-light"
          className="logbtn"
          size="md"
          onClick={() => {
            this.loginService.glogin().then(() => {
              this.setLoginBtnStateOff();
            });
          }}
        >
          login
        </Button>
      );
    } else {
      return (
        <Button
          variant="outline-light"
          className="logbtn"
          size="md"
          onClick={() => {
            this.loginService.glogout().then(() => {
              this.setLoginBtnStateOn();
            });
          }}
        >
          logout
        </Button>
      );
    }
  }; // end of retbutton

  render() {
    return (
      <div>
        <div className="App-header">
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={7} md={10} sm={11} className="App-header">
                Sudoku
              </Col>
              <Col className="App-header-login">
                <Row className="justify-content-md-end">{this.retButton()}</Row>
              </Col>
              <div className="loginuser">
                <Col>{this.retUname()}</Col>
              </div>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
