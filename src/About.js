import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

 /***************
 * developer: Vivek Sharma
 * date : 17-jun-21
 * for sudoky program
 ***************/

export default class About extends Component {
    render() {
        return (
            <main>
                <Container className="p-3">
      <h1 className="header">Sudoku JavaScript Implementation</h1>
      <h2 className="header">Sudoku Algorithm (no backtracking)</h2>
      <hr />
      <p>
      This program fills the 9*9 grid with valid sudoku numbers. 2 dimension arrays play an important role in most 2d games. Sudoku is no exception, consider it as tiles which needs to fill up the screen at valid position. We pick a box try to insert a number there, run all the rules, if it works good if not try the next number.
      This implementation don't use back tracking, although parts of algorithm tries to replicate the same scenario i.e. back track your steps and start with next iteration. Heart of this program is a javascript file sudokucode.js, github repository below.
      </p>
      <p><h2>Detailed Algorithm</h2></p>
      <p>
      <ListGroup variant="flush">
  <ListGroup.Item>Initialize all arrays used in the program</ListGroup.Item>
  <ListGroup.Item>Create a randomized array of 9 numbers – tmpjumbarr</ListGroup.Item>
</ListGroup>
<hr/>
For each of the nine box do below 
<ListGroup variant="flush">
  <ListGroup.Item>Check whether that number satisfied all the rules or not
  <ListGroup variant="flush">
  <ListGroup.Item>-	No same number in same row</ListGroup.Item>
  <ListGroup.Item>-	No same number in same column</ListGroup.Item>
  <ListGroup.Item>-	No same number in 3*3 grid that box is part of</ListGroup.Item>
  </ListGroup>
</ListGroup.Item>
  <ListGroup.Item>If the number satisfies fit it in the box, remove this number from tmpjumbarr and move on to next box</ListGroup.Item>
  <ListGroup.Item>If the number fails, put this number at the end for another box and try the next number in the grid</ListGroup.Item>
  <ListGroup.Item>Even after multiple tries we are not able to fill the grid, that means we are in deadlock, empty out the row and then start again</ListGroup.Item>
</ListGroup>

      </p>
      <p>
          <Table>
              <tr><td> Front End </td>
              <td>Reactjs with bootstrap</td></tr>
              <tr><td>Back End</td><td>None</td></tr>
              <tr><td>Hosting</td><td>Firebase</td></tr>
              <tr><td>Developer</td><td>Vivek Sharma</td></tr>
              <tr><td>Github</td><td><Button variant="light" href="https://github.com/blackarck">profile</Button></td></tr>
              <tr><td>Repository</td><td><Button variant="light" href="https://github.com/blackarck/sudokujs">repo</Button></td></tr>

          </Table>

      </p>

                </Container>
                 
            </main>
        )
    }
}

