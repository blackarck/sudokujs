import React  from 'react';
import './App.css';

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

  if( String(this.props.value).endsWith("x")){
    whichClass=whichClass+" RedBtn";
  }

  if(this.props.ival === 2 || this.props.ival === 5 ){
    whichClass=whichClass + " bpad";  
  }
  if(this.props.jval === 2 || this.props.jval ===5){
    whichClass= "rpad " + whichClass ;
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