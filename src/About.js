import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import loginsrvc from "./loginsrvc";

/***************
 * developer: Vivek Sharma
 * date : 17-jun-21
 * for sudoky program
 ***************/

export default class About extends Component {
  loginService = new loginsrvc();

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main>
        <Container className="p-3">
          <h1 className="header">Sudoku JavaScript Implementation</h1>
          <h2 className="header">Sudoku Algorithm (no backtracking)</h2>
          <hr />
          <p>
            This program fills the 9*9 grid with valid numbers. 2 dimension
            arrays play an important role in most 2d games. Sudoku is no
            exception, consider it as screen where we need to place tiles at
            valid position. We pick a box try to insert a number there, run all
            the rules, if it works good if not try the next number. This
            implementation don't use recursion or traditional back tracking,
            although parts of algorithm tries to replicate the same scenario
            i.e. back track your steps and start with next iteration. Heart of
            this program is a javascript file sudokucode.js
          </p>
          <p>
            <h2>Detailed Algorithm</h2>
          </p>
          <p>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Initialize all arrays used in the program
              </ListGroup.Item>
              <ListGroup.Item>
                Create a randomized array of 9 numbers, to get unique puzzle
                every time – tmpjumbarr
              </ListGroup.Item>
            </ListGroup>
            <hr />
            For each of the nine box do below
            <ListGroup variant="flush">
              <ListGroup.Item>
                Check whether that number satisfied all the rules or not
                <ListGroup variant="flush">
                  <ListGroup.Item>- No same number in same row</ListGroup.Item>
                  <ListGroup.Item>
                    - No same number in same column
                  </ListGroup.Item>
                  <ListGroup.Item>
                    - No same number in 3*3 grid that box is part of
                  </ListGroup.Item>
                </ListGroup>
              </ListGroup.Item>
              <ListGroup.Item>
                If the number satisfies fit it in the box, remove this number
                from tmpjumbarr and move on to next box
              </ListGroup.Item>
              <ListGroup.Item>
                If the number fails, put this number at the end for another box
                and try the next number in the grid
              </ListGroup.Item>
              <ListGroup.Item>
                Even after multiple tries we are not able to fill the grid, that
                means we are in deadlock, empty out the row and then start again
              </ListGroup.Item>
            </ListGroup>
          </p>
          <p>
            <Table>
              <tr>
                <td> Front End </td>
                <td>Reactjs with bootstrap</td>
              </tr>
              <tr>
                <td>Back End</td>
                <td>nodejs server with mysql DB</td>
              </tr>
              <tr>
                <td>Hosting for front end</td>
                <td>Firebase</td>
              </tr>
              <tr>
                <td>Hosting for back end</td>
                <td>AWS Server</td>
              </tr>
              <tr>
                <td>Developer</td>
                <td>Vivek Sharma</td>
              </tr>
              <tr>
                <td>Github</td>
                <td>
                  <Button variant="light" href="https://github.com/blackarck">
                    profile
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Repository</td>
                <td>
                  <Button
                    variant="light"
                    href="https://github.com/blackarck/sudokujs"
                  >
                    repo
                  </Button>
                </td>
              </tr>
            </Table>
          </p>
          <p>
            There could be many means to achieve an objective in coding. All are
            correct as long as they meet a certain performance threshold. If you
            review the program in detail you will notice small steps have been
            added to improve performance ( in short terms number of loops the
            program jumps through). I have left a debugging message in the
            output
            <br />
            "Got stuck gotta redo some steps."
            <br />
            This line keeps track of number of times the program back tracked
            its step. Feel free to experiment with different parts of the
            algorithm to see how it impacts this. Right now it at most runs once
            or twice.
          </p>

          <h2>Updates</h2>
          <p>
            Added functionality to read params if /?val=nshowmenu is present
            don't show menu.
          </p>
          <p>Mobile friendly, no menu and smaller blocks so fits vertically</p>
          <p>Added options to save game state and load it, for this login is required, so added functionality for google login</p>
          <p>Added option to share game with a friend, there is a button which will generate a link in clipboard, this sharable link will create same game for user</p>
        </Container>
      </main>
    );
  }
}
