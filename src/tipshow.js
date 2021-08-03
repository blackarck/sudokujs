import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import tipsdata from './data/tipsdata';

 /***************
 * developer: Vivek Sharma
 * date : 25-jul-21
 * for sudoku program
 ***************/

function Tipshow() {
  
    //console.log("count of tipsdata is " +  tipsdata.length + " ," + JSON.stringify(tipsdata));
    //fetch a random number between 0 and tipsdata.length-1
    var rnd = Math.floor(Math.random() * tipsdata.length);
    var texttoshow = tipsdata[rnd].tip;
  return (
    <Carousel>
  <Carousel.Item>
     <p>{texttoshow} </p>
    <Carousel.Caption>
      <h3>Test</h3>
      <p> test description </p>
    </Carousel.Caption>
  </Carousel.Item>

</Carousel>
   );
}

export default Tipshow;
