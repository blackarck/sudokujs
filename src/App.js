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
 //import {queryString,location} from 'query-string';

 const queryString = require('query-string');
 /***************
 * developer: Vivek Sharma
 * date : 17-jun-21
 * for sudoky program
 ***************/
 

function App() {
   const parsed = queryString.parse(window.location.search);
   //console.log("Parse value-"+parsed.val);
  
  var showmenu=true;
  if(parsed.val==="nshowmenu"){
    showmenu=false;
   // console.log("Showmenu is false");
  }

   return (

    <Router>
     <Appheader/>
     <Container fluid><Row>
       <Col md="3">
      {showmenu && <Navin/>}
      </Col>
      <Col md="auto">
      <Switch>
      <Route path="/about" component={About}/>
      <Route path="/sudoku" component={SudClassVw}/>
      <Route path="/" component={SudClassVw}/>
      </Switch></Col>
      </Row>
      </Container>
    </Router>
  );
}

export default App;
