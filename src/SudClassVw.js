import React, { Component } from 'react';
import {printSudoku,sudokuarr,fillsudokuarr,hideSudoku,hiddenSudokuarr,hiddenSudokuclone} from './sudokucode';
import './App.css';
import ModalWind from './ModalWind';
import Square from './Square';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
/***************
 * developer: Vivek Sharma
 * date : 17-jun-21
 * for sudoky program
 ***************/

export default class SudClassVw extends Component {

    constructor(props){
        super(props);
        fillsudokuarr();
        hideSudoku(2);

        //calculate hidden sudoku puzzle and define initial puzzle
        this.state = {
            sudoarr: hiddenSudokuarr,
            show: false,
            showNewMode:false,
            iclick:0,
            jclick:0,
            selectedval:"easy",
        }
    }

    NewGame=()=>{
        this.setState({showNewMode:true});
    }

    resetGrid1=()=>{
        //printSudoku(2);
        var squarearr1=[[]];
        for(let i=0;i<9;i++){
            squarearr1[i]=new Array(9);
             
        }
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                squarearr1[i][j] = hiddenSudokuclone[i][j];
            }
        }
        //const squarearr1 = hiddenSudokuclone.slice();
         this.setState({sudoarr: squarearr1});
    }

    solveGrid=()=>{
        this.setState({sudoarr:sudokuarr});
    }

    renderSquare=(i,j)=> {
        return (
          <Square
            value={this.state.sudoarr[i][j]}
            hidenarr={hiddenSudokuclone[i][j]}
            ival={i} jval={j}
            onClick={() => this.handleClick(i,j)}
          />
        );
      }//end of rendersquare

      handleClose=()=>{
        this.setState({show:false});
        this.setState({showNewMode:false});
      }

      handleClick=(i,j)=>{
          this.setState({show:true, iclick:i,jclick:j})
          //console.log("Shows state is "+this.state.show + " Clicked at-"+i+","+j);
      }//end of handleclick

      handleokbtn=()=>{
          var diffoption=this.state.selectedval;
          switch(diffoption){
              case "easy":
                  this.restartGrid(1);
                  break;
               case "medium":
                this.restartGrid(1);
                break;
            case "hard":
                this.restartGrid(2);
                break;
          }
       }

       handleChange = (e) => {
        this.setState({selectedval:e.target.value});
        this.handleokbtn();
         //console.log("Selection is "+ e.target.value);
      }

      setValueSqr=(i)=>{
        const squarearr = this.state.sudoarr.slice();
        squarearr[this.state.iclick][this.state.jclick] = i;
        this.setState({sudoarr:squarearr});

        this.checkWin();
      }

      restartGrid=(diffi)=>{
      
        fillsudokuarr();
        hideSudoku(diffi);
        this.setState({sudoarr:hiddenSudokuarr});
      }

      checkGrid=()=>{
        //go through all the words
        // mark red which are incorrect
        const checkArr= this.state.sudoarr.slice();
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                if(
                    checkArr[i][j] !== sudokuarr[i][j] && checkArr[i][j]!==" "){
                    checkArr[i][j] =  checkArr[i][j] + "x";
                }
            }
        }//end of for
        this.setState({sudoarr:checkArr});

      }

      checkWin=()=>{
        //checkwin condition
        //do a compare of this grid with our filled grid if all equal its won 
        //show an alert
        var isWon=true;
        const checkArr= this.state.sudoarr.slice();
        outerloop:
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                if(
                    checkArr[i][j] !== sudokuarr[i][j]){
                    isWon=false;
                    break outerloop;
                }
            }
        }
        if(isWon){
            alert("Yay !! you won ");
        }

      }

    render() {
        //we can have code here
        
        return (
          <main>
          <div className="TopRow">
          <div className="inarow">{this.renderSquare(0,0)}{this.renderSquare(0,1)}{this.renderSquare(0,2)}{this.renderSquare(0,3)}{this.renderSquare(0,4)}{this.renderSquare(0,5)}{this.renderSquare(0,6)}{this.renderSquare(0,7)}{this.renderSquare(0,8)}</div>
          <div className="inarow">{this.renderSquare(1,0)}{this.renderSquare(1,1)}{this.renderSquare(1,2)}{this.renderSquare(1,3)}{this.renderSquare(1,4)}{this.renderSquare(1,5)}{this.renderSquare(1,6)}{this.renderSquare(1,7)}{this.renderSquare(1,8)}</div>
          <div className="inarow">{this.renderSquare(2,0)}{this.renderSquare(2,1)}{this.renderSquare(2,2)}{this.renderSquare(2,3)}{this.renderSquare(2,4)}{this.renderSquare(2,5)}{this.renderSquare(2,6)}{this.renderSquare(2,7)}{this.renderSquare(2,8)}</div>
          <div className="inarow">{this.renderSquare(3,0)}{this.renderSquare(3,1)}{this.renderSquare(3,2)}{this.renderSquare(3,3)}{this.renderSquare(3,4)}{this.renderSquare(3,5)}{this.renderSquare(3,6)}{this.renderSquare(3,7)}{this.renderSquare(3,8)}</div>
          <div className="inarow">{this.renderSquare(4,0)}{this.renderSquare(4,1)}{this.renderSquare(4,2)}{this.renderSquare(4,3)}{this.renderSquare(4,4)}{this.renderSquare(4,5)}{this.renderSquare(4,6)}{this.renderSquare(4,7)}{this.renderSquare(4,8)}</div>
          <div className="inarow">{this.renderSquare(5,0)}{this.renderSquare(5,1)}{this.renderSquare(5,2)}{this.renderSquare(5,3)}{this.renderSquare(5,4)}{this.renderSquare(5,5)}{this.renderSquare(5,6)}{this.renderSquare(5,7)}{this.renderSquare(5,8)}</div>
          <div className="inarow">{this.renderSquare(6,0)}{this.renderSquare(6,1)}{this.renderSquare(6,2)}{this.renderSquare(6,3)}{this.renderSquare(6,4)}{this.renderSquare(6,5)}{this.renderSquare(6,6)}{this.renderSquare(6,7)}{this.renderSquare(6,8)}</div>
          <div className="inarow">{this.renderSquare(7,0)}{this.renderSquare(7,1)}{this.renderSquare(7,2)}{this.renderSquare(7,3)}{this.renderSquare(7,4)}{this.renderSquare(7,5)}{this.renderSquare(7,6)}{this.renderSquare(7,7)}{this.renderSquare(7,8)}</div>
          <div className="inarow">{this.renderSquare(8,0)}{this.renderSquare(8,1)}{this.renderSquare(8,2)}{this.renderSquare(8,3)}{this.renderSquare(8,4)}{this.renderSquare(8,5)}{this.renderSquare(8,6)}{this.renderSquare(8,7)}{this.renderSquare(8,8)}</div>
          </div>

          <div className="downbtnrow">
          <Button variant="light" className="menubtn1"   onClick={()=> {
              this.resetGrid1();
             }}> Reset </Button>
               <Button variant="light"  className="menubtn1"  onClick={()=> {
              this.NewGame();
             }}> New </Button>
               <Button variant="light"  className="menubtn1"  onClick={()=> {
              this.checkGrid();
             }}> Check </Button>
                <Button variant="light" className="menubtn1"  onClick={()=> {
              this.solveGrid();
             }}> Solve </Button>
          </div>


          <Modal size="sm" show={this.state.show} onHide={this.handleClose} handleClose={this.handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Fill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
          <Row className="justify-content-md-center">
              <div className="renderSq">
            <Button variant="light"  className="inputBtn" 
            onClick={()=> { 
                this.setValueSqr(1);
              this.handleClose(); }}>1</Button>
               <Button variant="light"  className="inputBtn" 
            onClick={()=> {  this.setValueSqr(2);
            this.handleClose(); }}>2</Button>
               <Button variant="light"  className="inputBtn" 
            onClick={()=> {  this.setValueSqr(3);
            this.handleClose(); }}>3</Button></div>
    </Row><Row className="justify-content-md-center"> 
           <div className="renderSq">
            <Button variant="light"  className="inputBtn" 
            onClick={()=> {  this.setValueSqr(4);
            this.handleClose(); }}>4</Button>
               <Button variant="light"  className="inputBtn" 
            onClick={()=> { this.setValueSqr(5);
            this.handleClose(); }}>5</Button>
               <Button variant="light"  className="inputBtn" 
            onClick={()=> {  this.setValueSqr(6);
            this.handleClose(); }}>6</Button></div>
    </Row><Row className="justify-content-md-center"> 
          <div className="renderSq">
            <Button variant="light"  className="inputBtn" 
            onClick={()=> {  this.setValueSqr(7);
            this.handleClose(); }}>7</Button>
               <Button variant="light"  className="inputBtn" 
            onClick={()=> {  this.setValueSqr(8);
            this.handleClose(); }}>8</Button>
               <Button variant="light"  className="inputBtn" 
            onClick={()=> { this.setValueSqr(9);
            this.handleClose();
              }}>9</Button></div>
</Row><Row className="justify-content-md-center"> 
                <div className="renderSq">
            <Button variant="light"  
            onClick={()=> {  this.setValueSqr(" ");
            this.handleClose(); }}>Clear</Button>
            </div>
            </Row>
            </Container>
          </Modal.Body>
          </Modal>

          <Modal show={this.state.showNewMode} onHide={this.handleClose} handleokbtn={this.handleokbtn} windtype="difficulty">
          <Modal.Header closeButton>
          <Modal.Title>Choose Difficulty level</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <label>Choose a level</label>
                <select id="difficulty"  onChange={this.handleChange} className="SelectOption">
                <option value="" defaultValue></option>
                <option value="easy" defaultValue>Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                </select>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="light" className="inputBtn" 
            onClick={this.handleClose}>OK</Button>
            </Modal.Footer>
          </Modal>
          </main>
        )
    }
}
