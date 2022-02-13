import "./css/App.css";
import Appheader from "./Appheader";
import React, { Component } from "react";
import SudClassVw from "./SudClassVw";
import About from "./About";
import Navin from "./Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import {queryString,location} from 'query-string';
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
} from "@react-firebase/auth";
import config from "./fireconfig";
import loginsrvc from "./loginsrvc";

const queryString = require("query-string");
/***************
 * developer: Vivek Sharma
 * date : 17-jun-21
 * for sudoky program
 ***************/

//function App() {
export default class App extends Component {
  showmenu = true;
  loginSrvc = new loginsrvc();

  constructor(props) {
    super(props);
    const parsed = queryString.parse(window.location.search);
    //console.log("Parse value-"+parsed.val);

    if (parsed.val === "nshowmenu") {
      this.showmenu = false;
      // console.log("Showmenu is false");
    }
  } //end of constructor

  render() {
    return (
      <FirebaseAuthProvider firebase={firebase} {...config}>
        <Router>
          <Appheader />
          <Container fluid>
            <Row>
              <Col md="3">{this.showmenu && <Navin />}</Col>
              <Col md="auto">
                <Switch>
                  <Route path="/about">
                    <About />
                  </Route>
                  <Route path="/sudoku">
                    <SudClassVw />
                  </Route>
                  <Route path="/">
                    <SudClassVw />
                  </Route>
                </Switch>
              </Col>
            </Row>
          </Container>
        </Router>
      </FirebaseAuthProvider>
    );
  } //end of render
}

//export default App;
