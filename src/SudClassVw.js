import React, { Component } from "react";
import {
  sudokuarr,
  fillsudokuarr,
  hideSudoku,
  hiddenSudokuarr,
  hiddenSudokuclone,
} from "./sudokucode";
import "./css/App.css";
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
import clloadico from "./img/clloadico.svg";
import deleteico from "./img/deleteico.svg";
import downloadico from "./img/downloadico.svg";
import shareico from "./img/shareico.svg";
import loginsrvc from "./loginsrvc";
import gamesrvc from "./gamesrvc";
import upload from "./img/upload.svg";
import doneico from "./img/doneico.svg";
import restartico from "./img/restartico.svg";
import multiplayer from "./img/multipl.svg";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
/***************
 * developer: Vivek Sharma
 * date : 17-jun-21
 * for sudoky program
 ***************/

export default class SudClassVw extends Component {
  islogin = false;
  gameService = new gamesrvc();
  showgamearr = [];
  urlfirst = "http://localhost:4200/";

  constructor(props) {
    super(props);
    fillsudokuarr();
    hideSudoku(2);
    this.islogin = localStorage.getItem("loginstate") || false;
    //calculate hidden sudoku puzzle and define initial puzzle
    //console.log("Check is user is logged in " + this.islogin);
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
      showMultibtn: localStorage.getItem("loginstate"),
      gameStarted: true,
    };

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const paramgameid = params.get("gameid");

    if (paramgameid) {
      // alert("gameid is " + paramgameid);
      this.gameService.loadgameID(paramgameid).then((res) => {
        //console.log("Response of loadgameid is " + res[0].gstate);

        var sudoarr2d = this.process2darr(res[0].gstate);
        var harr2d = this.process2darr(res[0].hstate);
        var carr2d = this.process2darr(res[0].cstate);

        this.setState({
          sudoarr: sudoarr2d,
          gameid: paramgameid,
          hidsudoarr: harr2d,
          fullsudokuarr: carr2d,
        });
      });
    }
  } //end of constructor

  NewGame = () => {
    if (this.state.gameStarted) {
      //show the prompt
      confirmAlert({
        title: "Confirm game start",
        message: "Are you sure you want to start a new game",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              this.setState({ showNewMode: true, gameStarted: true });
            },
          },
          {
            label: "No",
            onClick: () => {
              //do nothing
            },
          },
        ],
      }); //end of confirmalert
    } else {
      this.setState({ showNewMode: true, gameStarted: true });
    }
  };

  resetGrid1 = () => {
    confirmAlert({
      title: "Confirm game reset",
      message: "This will clear all entries, are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            var squarearr1 = [[]];
            for (let i = 0; i < 9; i++) {
              squarearr1[i] = new Array(9);
            }
            for (let i = 0; i < 9; i++) {
              for (let j = 0; j < 9; j++) {
                squarearr1[i][j] = this.state.hidsudoarr[i][j];
              }
            }

            this.setState({ sudoarr: squarearr1 });
          },
        },
        {
          label: "No",
          onClick: () => {
            //do nothing
          },
        },
      ],
    }); //end of confirmalert
  }; //end of resetgrid1 called by reset button

  showsaveOff = () => {
    console.log("Save button off ");
    this.setState({ showsave: false });
  };
  showsaveOn = () => {
    console.log("Save button on ");

    this.setState({ showsave: true });
  };

  solveGrid = () => {
    confirmAlert({
      title: "Confirm solve game",
      message:
        "This will fill in all empty boxes, you might want to save your game first",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.setState({ sudoarr: this.state.fullsudokuarr });
          },
        },
        {
          label: "No",
          onClick: () => {
            //do nothing
          },
        },
      ],
    }); //end of confirmalert
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
      hidsudoarr: hiddenSudokuclone,
      fullsudokuarr: sudokuarr,
      gameStarted: true,
    });
  };

  checkGrid = () => {
    //go through all the words
    // mark red which are incorrect
    const checkArr = this.state.sudoarr.slice();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (
          parseInt(checkArr[i][j]) !==
            parseInt(this.state.fullsudokuarr[i][j]) &&
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
        if (
          parseInt(checkArr[i][j]) !== parseInt(this.state.fullsudokuarr[i][j])
        ) {
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

  saveGameforShare = () => {
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
      this.gameService.savegameforShare(gamedata).then((res) => {
        console.log("Game saved " + JSON.stringify(res));
        // this.loadgame(this.state.gameid);
      });
    } else {
      alert("Have to login to save");
    }
  }; //end of saveGameforShare
  getShowGames = () => {
    let rowsarr = [];
    for (let i = 0; i < this.showgamearr.length; i++) {
      rowsarr.push(
        <Row className="showgamescr">
          <Col>{this.showgamearr[i].id}</Col>
          <Col>{this.showgamearr[i].createdtime}</Col>
          <Col>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={this.renderTooltip({ texttoshow: "Load Game" })}
            >
              <Button
                variant="light"
                onClick={() => {
                  this.loadSelGame(i);
                  this.handleClose();
                }}
              >
                <img src={clloadico} />
              </Button>
            </OverlayTrigger>
          </Col>

          <Col>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={this.renderTooltip({ texttoshow: "Share GameID" })}
            >
              <Button
                variant="light"
                onClick={() => {
                  navigator.clipboard.writeText(
                    this.urlfirst + "?gameid=" + this.showgamearr[i].id
                  );
                  alert("GameID copied to clipboard. Share with a friend.");
                  this.handleClose();
                }}
              >
                <img src={shareico} />
              </Button>
            </OverlayTrigger>
          </Col>

          <Col>
            <Button
              variant="light"
              onClick={() => {
                //alert("Game id is "+ this.showgamearr[i].id);
                this.delSelGame(this.showgamearr[i].id);
                this.handleClose();
              }}
            >
              <img src={deleteico} />
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
    if (localStorage.getItem("loginstate")) {
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
    } else {
      alert("Have to login to save");
    }
  };

  multiStart = () => {
    if (localStorage.getItem("loginstate")) {
      var loginService = new loginsrvc();
      loginService.startMultiGame().then((data) => {
        console.log("rcvd res" + JSON.stringify(data));
      });
    } else {
      alert("Have to login to save");
    }
  }; //end of multistart

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

  delSelGame = (i) => {
    //alert("passing along "+i);
    this.gameService.delGame(i).then((res) => {}); //end of gameservice
  }; //end of delselgame

  loadgame = (gameid) => {
    if (localStorage.getItem("loginstate")) {
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
    } else {
      alert("Have to login to save");
    }
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
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip({ texttoshow: "reset gane" })}
          >
            <Button
              variant="light"
              className="menubtn1"
              onClick={() => {
                this.resetGrid1();
              }}
            >
              <img src={restartico} />
            </Button>
          </OverlayTrigger>
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

          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip({ texttoshow: "check entries" })}
          >
            <Button
              variant="light"
              className="menubtn1"
              onClick={() => {
                this.checkGrid();
              }}
            >
              <img src={doneico} />
            </Button>
          </OverlayTrigger>
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
              //disabled={this.state.showsave}
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
              // disabled={this.state.showsave}
              onClick={() => {
                this.showGame();
              }}
            >
              <img src={upload} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip({ texttoshow: "start multiplayer" })}
          >
            <Button
              variant="light"
              className="menubtn1"
              onClick={() => {
                this.multiStart();
              }}
            >
              <img src={multiplayer} />
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip({ texttoshow: "share game link" })}
          >
            <Button
              variant="light"
              className="menubtn1"
              onClick={() => {
                if (!this.state.gameid) {
                  console.log("Game id doesn't exists " + this.state.gameid);
                  this.saveGameforShare();
                }
                navigator.clipboard.writeText(
                  this.urlfirst + "?gameid=" + this.state.gameid
                );
                alert("GameID copied to clipboard. Share with a friend.");
              }}
            >
              <img src={shareico} />
            </Button>
          </OverlayTrigger>
        </div>

        <Modal
          size="sm"
          show={this.state.show}
          onHide={this.handleClose}
          handleClose={this.handleClose}
          className="optionscr"
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
            <Modal.Title>Saved Games</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{this.getShowGames()}</div>
          </Modal.Body>
        </Modal>
      </main>
    );
  }
}
