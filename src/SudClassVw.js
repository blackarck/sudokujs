import React, { Component } from "react";
import {
  printSudoku,
  sudokuarr,
  fillsudokuarr,
  hideSudoku,
  hiddenSudokuarr,
  hiddenSudokuclone,
} from "./sudokucode";
import "./css/App.css";
import ModalWind from "./ModalWind";
import Square from "./Square";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tipshow from "./tipshow";
import saveico from "./img/saveico.svg";
import helpico from "./img/helpico.svg";
import clearico from "./img/clearico.svg";
import loginsrvc from "./loginsrvc";
import gamesrvc from "./gamesrvc";
import upload from "./img/upload.svg";
/***************
 * developer: Vivek Sharma
 * date : 17-jun-21
 * for sudoky program
 ***************/

export default class SudClassVw extends Component {
  islogin = false;
  gameService = new gamesrvc();
  showgamearr = [];

  constructor(props) {
    super(props);
    fillsudokuarr();
    hideSudoku(2);
    this.islogin = localStorage.getItem("loginstate") || false;
    //calculate hidden sudoku puzzle and define initial puzzle
    this.state = {
      sudoarr: hiddenSudokuarr,
      hidsudoarr: hiddenSudokuclone,
      fullsudokuarr: sudokuarr,
      show: false,
      showNewMode: false,
      showHelpMenu: false,
      showLoadMenu: false,
      iclick: 0,
      jclick: 0,
      selectedval: "easy",
      clickColor: "00",
      showtip: true,
      showsave: localStorage.getItem("loginstate"),
      gameid: "",
    };
  }

  NewGame = () => {
    this.setState({ showNewMode: true });
  };

  resetGrid1 = () => {
    //printSudoku(2);
    var squarearr1 = [[]];
    for (let i = 0; i < 9; i++) {
      squarearr1[i] = new Array(9);
    }
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        // squarearr1[i][j] = hiddenSudokuclone[i][j];

        squarearr1[i][j] = this.state.hidsudoarr[i][j];
      }
    }
    //const squarearr1 = hiddenSudokuclone.slice();
    this.setState({ sudoarr: squarearr1 });
  };

  showsaveOff = () => {
    console.log("Save button off ");
    this.setState({ showsave: false });
  };
  showsaveOn = () => {
    console.log("Save button on ");

    this.setState({ showsave: true });
  };

  solveGrid = () => {
    this.setState({ sudoarr: this.state.fullsudokuarr });
  };

  renderSquare = (i, j) => {
    return (
      <Square
        value={this.state.sudoarr[i][j]}
        //hidenarr={hiddenSudokuclone[i][j]}
        hidenarr={this.state.hidsudoarr[i][j]}
        clickColor={this.state.clickColor}
        ival={i}
        jval={j}
        onClick={() => this.handleClick(i, j)}
      />
    );
  }; //end of rendersquare

  renderTooltip = (props) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        {props.texttoshow}
      </Tooltip>
    );
  }; // end of rendertooltip

  handleClose = () => {
    this.setState({
      show: false,
      showNewMode: false,
      showHelpMenu: false,
      showtip: false,
      showLoadMenu: false,
    });
  };

  handleClick = (i, j) => {
    if (window.innerWidth > 480) {
      this.setState({ show: true, iclick: i, jclick: j });
    } else {
      this.setState({ iclick: i, jclick: j, clickColor: "" + i + j });
    }
    //console.log("Shows state is "+this.state.show + " Clicked at-"+i+","+j);
  }; //end of handleclick

  handleokbtn = () => {
    var diffoption = this.state.selectedval;
    switch (diffoption) {
      case "easy":
        this.restartGrid(1);
        break;
      case "medium":
        this.restartGrid(1);
        break;
      case "hard":
        this.restartGrid(2);
        break;
      default:
        this.restartGrid(1);
        break;
    }
  };

  handleChange = (e) => {
    this.setState({ selectedval: e.target.value });
    this.handleokbtn();
    //console.log("Selection is "+ e.target.value);
  };

  setValueSqr = (i) => {
    const squarearr = this.state.sudoarr.slice();
    squarearr[this.state.iclick][this.state.jclick] = i;
    this.setState({ sudoarr: squarearr });

    this.checkWin();
  };

  restartGrid = (diffi) => {
    fillsudokuarr();
    hideSudoku(diffi);
    this.setState({
      gameid: "",
      sudoarr: hiddenSudokuarr,
      hidsudoarr: hiddenSudokuarr,
      fullsudokuarr: sudokuarr,
    });
  };

  checkGrid = () => {
    //go through all the words
    // mark red which are incorrect
    const checkArr = this.state.sudoarr.slice();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (
          checkArr[i][j] !== this.state.fullsudokuarr[i][j] &&
          checkArr[i][j] !== " "
        ) {
          checkArr[i][j] = checkArr[i][j] + "x";
        }
      }
    } //end of for
    this.setState({ sudoarr: checkArr });
  };

  checkWin = () => {
    //checkwin condition
    //do a compare of this grid with our filled grid if all equal its won
    //show an alert
    var isWon = true;
    const checkArr = this.state.sudoarr.slice();
    outerloop: for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (checkArr[i][j] !== this.state.fullsudokuarr[i][j]) {
          isWon = false;
          break outerloop;
        }
      }
    }
    if (isWon) {
      alert("Yay !! you won ");
    }
  };

  showHelp = () => {
    this.setState({ showHelpMenu: true });
  };

  saveGame = () => {
    //check whether user is logged in or not
    if (localStorage.getItem("loginstate")) {
      console.log("User logged in moving forward");
      //parms to pass
      // currentstate - this.state.sudoarr
      // completestate - sudokuarr
      // hiddenstate - hiddenSudokuarr
      let gamedata = {
        currentstate: this.state.sudoarr,
        completestate: this.state.fullsudokuarr,
        //hiddenstate: hiddenSudokuclone,
        hiddenstate: this.state.hidsudoarr,
        gameid: this.state.gameid,
      };
      this.gameService.savegame(gamedata).then((res) => {
        // console.log("Game saved " + JSON.stringify(res));
        this.loadgame(this.state.gameid);
      });
    } else {
      alert("Have to login to save");
    }
    //save the game
  };

  getShowGames = () => {
    let rowsarr = [];
    for (let i = 0; i < this.showgamearr.length; i++) {
      rowsarr.push(
        <Row className="showgamescr">
          <Col>{this.showgamearr[i].id}</Col>
          <Col>{this.showgamearr[i].createdtime}</Col>
          <Col>
            {" "}
            <Button
              variant="light"
              className="menuLoadBtn"
              size="sm"
              onClick={() => {
                this.loadSelGame(i);
                this.handleClose();
              }}
            >
              Load
            </Button>{" "}
          </Col>
        </Row>
      );
    }
    return (
      <div>
        <Container>{rowsarr}</Container>
      </div>
    );
  }; //end of getShowGames

  showGame = () => {
    //show all games for this user
    this.showgamearr = "";
    this.gameService.showAllGames().then((res) => {
      //console.log("res for showgames is " + JSON.stringify(res));
      if (res) {
        console.log("length of res is " + res.length);
        this.showgamearr = res;
        console.log(
          "ID - " +
            this.showgamearr[0].id +
            " Created on " +
            this.showgamearr[0].createdtime
        );
        this.setState({ showLoadMenu: true });
      }
    });
  };

  loadSelGame = (i) => {
    var sudoarr2d = this.process2darr(this.showgamearr[i].gstate);
    var harr2d = this.process2darr(this.showgamearr[i].hstate);
    var carr2d = this.process2darr(this.showgamearr[i].cstate);

    console.log("coming here " + harr2d);
    this.setState({
      sudoarr: sudoarr2d,
      gameid: this.showgamearr[i].id,
      hidsudoarr: harr2d,
      fullsudokuarr: carr2d,
    });
  };

  loadgame = (gameid) => {
    this.gameService.loadgame(gameid).then((res) => {
      //console.log("gstate is " + this.process2darr(res[0].gstate));
      var sudoarr2d = this.process2darr(res[0].gstate);
      var harr2d = this.process2darr(res[0].hstate);
      var carr2d = this.process2darr(res[0].cstate);

      this.setState({
        sudoarr: sudoarr2d,
        gameid: res[0].id,
        hidsudoarr: harr2d,
        fullsudokuarr: carr2d,
      });
    }); //end of game service
  }; //load new game

  process2darr(valstr) {
    let ret2darr = [[]];
    valstr = valstr.replace("'", "").replace("'", "");
    var arr1d = valstr.split(",");

    ret2darr.pop();
    for (var i = 0; i <= 8; i++) {
      var arr1dd = arr1d.splice(0, 9);
      ret2darr.push(arr1dd);
    }
    return ret2darr;
  }

  render() {
    //we can have code here
    return (
      <main>
        <div className="TopRow container-fluid">
          <div className="inarow">
            {this.renderSquare(0, 0)}
            {this.renderSquare(0, 1)}
            {this.renderSquare(0, 2)}
            {this.renderSquare(0, 3)}
            {this.renderSquare(0, 4)}
            {this.renderSquare(0, 5)}
            {this.renderSquare(0, 6)}
            {this.renderSquare(0, 7)}
            {this.renderSquare(0, 8)}
          </div>
          <div className="inarow">
            {this.renderSquare(1, 0)}
            {this.renderSquare(1, 1)}
            {this.renderSquare(1, 2)}
            {this.renderSquare(1, 3)}
            {this.renderSquare(1, 4)}
            {this.renderSquare(1, 5)}
            {this.renderSquare(1, 6)}
            {this.renderSquare(1, 7)}
            {this.renderSquare(1, 8)}
          </div>
          <div className="inarow">
            {this.renderSquare(2, 0)}
            {this.renderSquare(2, 1)}
            {this.renderSquare(2, 2)}
            {this.renderSquare(2, 3)}
            {this.renderSquare(2, 4)}
            {this.renderSquare(2, 5)}
            {this.renderSquare(2, 6)}
            {this.renderSquare(2, 7)}
            {this.renderSquare(2, 8)}
          </div>
          <div className="inarow">
            {this.renderSquare(3, 0)}
            {this.renderSquare(3, 1)}
            {this.renderSquare(3, 2)}
            {this.renderSquare(3, 3)}
            {this.renderSquare(3, 4)}
            {this.renderSquare(3, 5)}
            {this.renderSquare(3, 6)}
            {this.renderSquare(3, 7)}
            {this.renderSquare(3, 8)}
          </div>
          <div className="inarow">
            {this.renderSquare(4, 0)}
            {this.renderSquare(4, 1)}
            {this.renderSquare(4, 2)}
            {this.renderSquare(4, 3)}
            {this.renderSquare(4, 4)}
            {this.renderSquare(4, 5)}
            {this.renderSquare(4, 6)}
            {this.renderSquare(4, 7)}
            {this.renderSquare(4, 8)}
          </div>
          <div className="inarow">
            {this.renderSquare(5, 0)}
            {this.renderSquare(5, 1)}
            {this.renderSquare(5, 2)}
            {this.renderSquare(5, 3)}
            {this.renderSquare(5, 4)}
            {this.renderSquare(5, 5)}
            {this.renderSquare(5, 6)}
            {this.renderSquare(5, 7)}
            {this.renderSquare(5, 8)}
          </div>
          <div className="inarow">
            {this.renderSquare(6, 0)}
            {this.renderSquare(6, 1)}
            {this.renderSquare(6, 2)}
            {this.renderSquare(6, 3)}
            {this.renderSquare(6, 4)}
            {this.renderSquare(6, 5)}
            {this.renderSquare(6, 6)}
            {this.renderSquare(6, 7)}
            {this.renderSquare(6, 8)}
          </div>
          <div className="inarow">
            {this.renderSquare(7, 0)}
            {this.renderSquare(7, 1)}
            {this.renderSquare(7, 2)}
            {this.renderSquare(7, 3)}
            {this.renderSquare(7, 4)}
            {this.renderSquare(7, 5)}
            {this.renderSquare(7, 6)}
            {this.renderSquare(7, 7)}
            {this.renderSquare(7, 8)}
          </div>
          <div className="inarow">
            {this.renderSquare(8, 0)}
            {this.renderSquare(8, 1)}
            {this.renderSquare(8, 2)}
            {this.renderSquare(8, 3)}
            {this.renderSquare(8, 4)}
            {this.renderSquare(8, 5)}
            {this.renderSquare(8, 6)}
            {this.renderSquare(8, 7)}
            {this.renderSquare(8, 8)}
          </div>
        </div>

        <div className="container-fluid">
          <Button
            variant="light"
            className="rowBtn"
            onClick={() => {
              this.setValueSqr(1);
              this.handleClose();
            }}
          >
            1
          </Button>
          <Button
            variant="light"
            className="rowBtn"
            onClick={() => {
              this.setValueSqr(2);
              this.handleClose();
            }}
          >
            2
          </Button>
          <Button
            variant="light"
            className="rowBtn"
            onClick={() => {
              this.setValueSqr(3);
              this.handleClose();
            }}
          >
            3
          </Button>
          <Button
            variant="light"
            className="rowBtn"
            onClick={() => {
              this.setValueSqr(4);
              this.handleClose();
            }}
          >
            4
          </Button>
          <Button
            variant="light"
            className="rowBtn"
            onClick={() => {
              this.setValueSqr(5);
              this.handleClose();
            }}
          >
            5
          </Button>
          <Button
            variant="light"
            className="rowBtn"
            onClick={() => {
              this.setValueSqr(6);
              this.handleClose();
            }}
          >
            6
          </Button>
          <Button
            variant="light"
            className="rowBtn"
            onClick={() => {
              this.setValueSqr(7);
              this.handleClose();
            }}
          >
            7
          </Button>
          <Button
            variant="light"
            className="rowBtn"
            onClick={() => {
              this.setValueSqr(8);
              this.handleClose();
            }}
          >
            8
          </Button>
          <Button
            variant="light"
            className="rowBtn"
            onClick={() => {
              this.setValueSqr(9);
              this.handleClose();
            }}
          >
            9
          </Button>
          <p></p>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip({ texttoshow: "clear" })}
          >
            <Button
              variant="light"
              onClick={() => {
                this.setValueSqr(" ");
                this.handleClose();
              }}
            >
              <img src={clearico} />
            </Button>
          </OverlayTrigger>
        </div>

        <div className="downbtnrow container-fluid">
          <Button
            variant="light"
            className="menubtn1"
            onClick={() => {
              this.resetGrid1();
            }}
          >
            {" "}
            Reset{" "}
          </Button>
          <Button
            variant="light"
            className="menubtn1"
            onClick={() => {
              this.NewGame();
            }}
          >
            {" "}
            New{" "}
          </Button>
          <Button
            variant="light"
            className="menubtn1"
            onClick={() => {
              this.checkGrid();
            }}
          >
            {" "}
            Check{" "}
          </Button>
          <Button
            variant="light"
            className="menubtn1"
            onClick={() => {
              this.solveGrid();
            }}
          >
            {" "}
            Solve{" "}
          </Button>

          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip({ texttoshow: "help" })}
          >
            <Button
              variant="light"
              className="menubtn1"
              onClick={() => {
                this.showHelp();
              }}
            >
              <img src={helpico} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip({ texttoshow: "save game" })}
          >
            <Button
              variant="light"
              className="menubtn1"
              onClick={() => {
                this.saveGame();
              }}
            >
              <img src={saveico} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip({ texttoshow: "load game" })}
          >
            <Button
              variant="light"
              className="menubtn1"
              onClick={() => {
                this.showGame();
              }}
            >
              <img src={upload} />
            </Button>
          </OverlayTrigger>
        </div>

        <Modal
          size="sm"
          show={this.state.show}
          onHide={this.handleClose}
          handleClose={this.handleClose}
          class="optionscr"
        >
          <Modal.Header closeButton>
            <Modal.Title>Fill</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="justify-content-sm-center">
                <div className="renderSq">
                  <Button
                    variant="light"
                    className="inputBtn"
                    onClick={() => {
                      this.setValueSqr(1);
                      this.handleClose();
                    }}
                  >
                    1
                  </Button>
                  <Button
                    variant="light"
                    className="inputBtn"
                    onClick={() => {
                      this.setValueSqr(2);
                      this.handleClose();
                    }}
                  >
                    2
                  </Button>
                  <Button
                    variant="light"
                    className="inputBtn"
                    onClick={() => {
                      this.setValueSqr(3);
                      this.handleClose();
                    }}
                  >
                    3
                  </Button>
                </div>
              </Row>
              <Row className="justify-content-md-center">
                <div className="renderSq">
                  <Button
                    variant="light"
                    className="inputBtn"
                    onClick={() => {
                      this.setValueSqr(4);
                      this.handleClose();
                    }}
                  >
                    4
                  </Button>
                  <Button
                    variant="light"
                    className="inputBtn"
                    onClick={() => {
                      this.setValueSqr(5);
                      this.handleClose();
                    }}
                  >
                    5
                  </Button>
                  <Button
                    variant="light"
                    className="inputBtn"
                    onClick={() => {
                      this.setValueSqr(6);
                      this.handleClose();
                    }}
                  >
                    6
                  </Button>
                </div>
              </Row>
              <Row className="justify-content-md-center">
                <div className="renderSq">
                  <Button
                    variant="light"
                    className="inputBtn"
                    onClick={() => {
                      this.setValueSqr(7);
                      this.handleClose();
                    }}
                  >
                    7
                  </Button>
                  <Button
                    variant="light"
                    className="inputBtn"
                    onClick={() => {
                      this.setValueSqr(8);
                      this.handleClose();
                    }}
                  >
                    8
                  </Button>
                  <Button
                    variant="light"
                    className="inputBtn"
                    onClick={() => {
                      this.setValueSqr(9);
                      this.handleClose();
                    }}
                  >
                    9
                  </Button>
                </div>
              </Row>
              <Row className="justify-content-md-center">
                <div className="renderSq">
                  <Button
                    variant="light"
                    onClick={() => {
                      this.setValueSqr(" ");
                      this.handleClose();
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>

        <Modal
          show={this.state.showNewMode}
          onHide={this.handleClose}
          handleokbtn={this.handleokbtn}
          windtype="difficulty"
        >
          <Modal.Header closeButton>
            <Modal.Title>Choose Difficulty level</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Choose a level</label>
            <select
              id="difficulty"
              onChange={this.handleChange}
              className="SelectOption"
            >
              <option value="" defaultValue></option>
              <option value="easy" defaultValue>
                Easy
              </option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              className="inputBtn"
              onClick={this.handleClose}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showHelpMenu}
          onHide={this.handleClose}
          handleokbtn={this.handleokbtn}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sudoku Help</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h4>Reset</h4>
              <p>Will reset the grid. Will erase all entries !</p>
              <h4>Check</h4>
              <p>Will turn incorrect entry red (x)</p>
              <h4>Solve</h4>
              <p>Will solve the puzzle</p>
              <h4>Save</h4>
              <p>Will save the game, if logged in</p>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={this.state.showtip}
          onHide={this.handleClose}
          handleokbtn={this.handleokbtn}
        >
          <Modal.Header closeButton>
            <Modal.Title>Tips</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tipshow />
          </Modal.Body>
        </Modal>

        <Modal
          show={this.state.showLoadMenu}
          onHide={this.handleClose}
          handleokbtn={this.handleokbtn}
          windtype="showgame"
        >
          <Modal.Header closeButton>
            <Modal.Title>Load Save Game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{this.getShowGames()}</div>
          </Modal.Body>
        </Modal>
      </main>
    );
  }
}
