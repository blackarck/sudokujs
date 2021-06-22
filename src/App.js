 import './App.css';
 import Appheader from './Appheader';
 import React from 'react';
 import SudClassVw from './SudClassVw';
 import About from './About';
 import Navin from './Nav';
 import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
 import Container from 'react-bootstrap/Container'
 import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';



 /***************
 * developer: Vivek Sharma
 * date : 17-jun-21
 * for sudoky program
 ***************/

function App() {
  return (

    <Router>
     <Appheader/>
     <Container fluid><Row>
       <Col md="3">
      <Navin/></Col>
      <Col md="auto">
      <Switch>
      <Route path="/about" component={About}/>
      <Route path="/sudoku" component={SudClassVw}/>
      </Switch></Col>
      </Row>
      </Container>
    </Router>
  );
}

export default App;
