import React from 'react';
import './css/App.css';
import  Nav from 'react-bootstrap/Nav';

 /***************
 * developer: Vivek Sharma
 * date : 17-jun-21
 * for sudoky program
 ***************/

function Navin() {
 
 
  return (
    <Nav defaultActiveKey="./sudoku" className="flex-column">
           <div className="navlinks">
           <Nav.Link eventKey="./about" to="./about" href="./about">About</Nav.Link> 
            <Nav.Link eventKey="./sudoku" to="./sudoku" href="./sudoku">Sudoku</Nav.Link> 
            </div>
    </Nav>
   );
}

export default Navin;
