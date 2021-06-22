import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import  Nav from 'react-bootstrap/Nav';

 /***************
 * developer: Vivek Sharma
 * date : 17-jun-21
 * for sudoky program
 ***************/

function Navin() {
  return (
    <Nav className="flex-column">
           <div className="navlinks"><Nav.Link eventKey="./about"  href="./about">About</Nav.Link> 
            <Nav.Link eventKey="./sudoku" href="./sudoku">Sudoku</Nav.Link> 
            </div>
    </Nav>
   );
}

export default Navin;
