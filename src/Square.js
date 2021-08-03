import React  from 'react';
import './css/App.css';

/***************
 * developer: Vivek Sharma
 * date : 17-jun-21
 * for sudoky program
 ***************/

export default class Square extends React.Component {

    render() {
   var disableon=false;
   var whichClass="SudokBtn";
 
   if(this.props.value===this.props.hidenarr && this.props.value !==" "){
    //console.log("it should be disabled ");
    disableon=true;
    whichClass="SudokuDisBtn"
  }

  if( (this.props.clickColor+"").substring(0,1) === this.props.ival+"" && (this.props.clickColor + "").substring(2,1)===this.props.jval +""){
    whichClass=whichClass + " sudokubtncolor";
    //console.log("Coming here ");
  }

  if( String(this.props.value).endsWith("x")){
    whichClass=whichClass+" RedBtn";
  }

  if(this.props.ival === 2 || this.props.ival === 5 || this.props.ival === 8){
    whichClass=whichClass + " bpad";  
  }
  if(this.props.jval === 2 || this.props.jval ===5 || this.props.jval ===8){
    whichClass= "rpad " + whichClass ;
  }
  if(this.props.ival === 0 || this.props.ival === 3 || this.props.ival === 6){
    //make upper border dark
    whichClass = whichClass + " umarg";
  }

  if(this.props.jval === 0 || this.props.jval === 3 || this.props.jval === 6){
    //make upper border dark
    whichClass = whichClass + " lmarg";
  }

      return (
        <button
          className={whichClass}
          onClick={() => this.props.onClick()} disabled={disableon}>
          {this.props.value}
        </button>
      );
    }
  }