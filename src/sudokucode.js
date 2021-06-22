//global vars
//initialize a 9*9 array of array 
/***************
 * developer: Vivek Sharma
 * date : 17-jun-21
 * for sudoky program
 ***************/

let sudokuarr= [[]];
let hiddenSudokuarr= [[]];
let hiddenSudokuclone= [[]];


for(let i=0;i<9;i++){
    sudokuarr[i]=new Array(9);
    hiddenSudokuarr[i]=new Array(9);
    hiddenSudokuclone[i]=new Array(9);
}
 
 //main function   fillsudokuarr();
 const resetAll=()=>{
    for(let i=0;i<9;i++){
        sudokuarr[i]=new Array(9);
        hiddenSudokuarr[i]=new Array(9);
        hiddenSudokuclone[i]=new Array(9);
    }
 }

//This function will return jumbled number array
const funcjumbarr =(tstarr)=>{
    for(let cnt in tstarr){
        let randpos= Math.trunc((Math.random()*10)%8);
        let numbatrandpos=tstarr[randpos];
        tstarr[randpos]=tstarr[cnt];
        tstarr[cnt]=numbatrandpos;
    };
    return tstarr;
};

// main algorithm to start filling numbers
const fillsudokuarr=()=>{
    //start filling the row one by one
    resetAll();
    let icnt=0;
    for(let i=0;i<9;i++){
        //console.log("i is "+i);
        icnt++;
        if(icnt>20){
            //problems with two rows 
            //go back one more row
            console.log("Got stuck gotta redo some steps.");
            icnt=0;
            let reducer=0;
            switch(i){
                case(i>7):
                case(i>6):
                case(i>5):
                reducer=4;
                break;
                case(i>4):
                reducer=3;
                break;
            }
            if(i>4){reducer=3;}
            if(i>3){reducer=2;}
            for(let icl=i-reducer;icl<=i;icl++){
            for(let l=0;l<9;l++){
                sudokuarr[icl][l]=0;
            }
        } 
            i=i-reducer;
        } //end of icnt>20

        let tmpjumbarr= funcjumbarr( [1,2,3,4,5,6,7,8,9]);
        let ranvaluepos=0;  
          //console.log("tmpjumparr "+tmpjumbarr.toString());
       for(let j=0;j<9;j++){
        //before assigning the value to the sudokubox check for rules  
            let notdone=true;
            let k=0;
            while(notdone && k<25){
            if(checkrules(i,j,tmpjumbarr[ranvaluepos])){
                //console.log("insert in pos ["+i+"]["+j+"], value-"+tmpjumbarr[ranvaluepos]);
                //the number satisfies all rules put itin  
                sudokuarr[i][j]=0;
                sudokuarr[i][j]=tmpjumbarr[ranvaluepos];
                //remove this value from temporary array
                tmpjumbarr.shift();
                notdone=false;
                break;
            }else{
                let tempnum=tmpjumbarr[ranvaluepos];
                 ///console.log("array before splice-"+tmpjumbarr.toString());
                tmpjumbarr.splice(ranvaluepos,1);
                ///console.log("array after splice-"+tmpjumbarr.toString());
                //remove the number and put it at the end since it might be used later
                tmpjumbarr.push(tempnum);
                //console.log("array after push -"+tmpjumbarr.toString());
             }//end of else
            //ranvaluepos++;
            k++;
        }//end of while
        if(notdone){ 
            //empty out the filled row and start again
            for(var l=0;l<9;l++){
                sudokuarr[i][l]=0;
            }
            i--;
            break;
        }//end of if notdone
      }//end of for j
      //for debugging printSudoku();
  }//end of for i 
  //printSudoku();  
  console.log("Done generating grid");
}//end of fillsudokuarr

const checkrules=(posi,posj,inpval)=>{
    let retvalue=false;
    //console.log("Checking for posi-",posi + " ,posj-"+ posj+",for num-"+inpval);

    //******Rule 1 check that there shouldn't be same number in the column****/
    for(let x=0;x<=posi;x++){
        //console.log("Comparing "+sudokuarr[x][posj] + ", with-"+inpval);
        if(sudokuarr[x][posj]===inpval){
            retvalue= false; //make it false
            break;
        }else{
            retvalue= true;
        }
    }//end of for
    //*******end of Rule1 */
 
    //****** Rule 2 ******** */
    if(retvalue){
    //Grids
    //0,0 to 2,2
    if(posi>=0 && posi<=2 && posj>=0 && posj <=2){
        //console.log("Coming in grid 1");
        outer_loop:
        for(var i=0;i<=2;i++){
            for(var j=0;j<=2;j++){
                if(sudokuarr[i][j]===inpval){
                    retvalue=false;
                    break outer_loop;
                }//end of if
            }//end of for j
        }//end of for i
    }
    //0,3 to 2,5
    if(posi>=0 && posi<=2 && posj>=3 && posj <=5){
        //console.log("Coming in grid 2");
        outer_loop:
        for(var i=0;i<=2;i++){
            for(var j=3;j<=5;j++){
                if(sudokuarr[i][j]===inpval){
                    retvalue=false;
                    break outer_loop;
                }//end of if
            }//end of for j
        }//end of for i
    }
    //0,6 to 2,8
    if(posi>=0 && posi<=2 && posj>=6 && posj <=8){
        //console.log("Coming in grid 3");
        outer_loop:
        for(var i=0;i<=2;i++){
            for(var j=6;j<=8;j++){
                if(sudokuarr[i][j]===inpval){
                    retvalue=false;
                    break outer_loop;
                }//end of if
            }//end of for j
        }//end of for i
    }

    //3,0 to 5,2
    if(posi>=3 && posi<=5 && posj>=0 && posj <=2){
        //console.log("Coming in grid 4");
        outer_loop:
        for(var i=3;i<=5;i++){
            for(var j=0;j<=2;j++){
                if(sudokuarr[i][j]===inpval){
                    retvalue=false;
                    break outer_loop;
                }//end of if
            }//end of for j
        }//end of for i
    }
    //3,3 to 5,5
    if(posi>=3 && posi<=5 && posj>=3 && posj <=5){
        //console.log("Coming in grid 5");
        outer_loop:
        for(var i=3;i<=5;i++){
            for(var j=3;j<=5;j++){
                if(sudokuarr[i][j]===inpval){
                    retvalue=false;
                    break outer_loop;
                }//end of if
            }//end of for j
        }//end of for i
    }
    //3,6 to 5,8
    if(posi>=3 && posi<=5 && posj>=6 && posj <=8){
        //console.log("Coming in grid 6");
        outer_loop:
        for(var i=3;i<=5;i++){
            for(var j=6;j<=8;j++){
                if(sudokuarr[i][j]===inpval){
                    retvalue=false;
                    break outer_loop;
                }//end of if
            }//end of for j
        }//end of for i
    }

    //6,0 to 8,2
    if(posi>=6 && posi<=8 && posj>=0 && posj <=2){
        //console.log("Coming in grid 7");
        outer_loop:
        for(var i=6;i<=8;i++){
            for(var j=0;j<=2;j++){
                if(sudokuarr[i][j]===inpval){
                    retvalue=false;
                    break outer_loop;
                }//end of if
            }//end of for j
        }//end of for i
    }
    //6,3 to 8,5
    if(posi>=6 && posi<=8 && posj>=3 && posj <=5){
        //console.log("Coming in grid 8");
        outer_loop:
        for(var i=6;i<=8;i++){
            for(var j=3;j<=5;j++){
                if(sudokuarr[i][j]===inpval){
                    retvalue=false;
                    break outer_loop;
                }//end of if
            }//end of for j
        }//end of for i
    }
    //6,6 to 8,8
    if(posi>=6 && posi<=8 && posj>=6 && posj <=8){
        //console.log("Coming in grid 9");
        outer_loop:
        for(var i=6;i<=8;i++){
            for(var j=6;j<=8;j++){
                if(sudokuarr[i][j]===inpval){
                    retvalue=false;
                    break outer_loop;
                }//end of if
            }//end of for j
        }//end of for i
    }
    

    }
    //******* End of Rule 2 */

    return retvalue;
}//end of checkrules

const printSudoku=(whichOne)=>{
    for(let i=0;i<9;i++){
        switch(whichOne){
            case 0:
                console.log("sudokuarr-"+sudokuarr[i].toString());
            break;

            case 1:
                console.log("hidesudokuarr-"+hiddenSudokuarr[i].toString());
            break;

            case 2:
                console.log("hideCloneArr-"+hiddenSudokuclone[i].toString());
            break;
        }
      
    }//end of for
    console.log("******************");
}//end of printSudoku


const hideSudoku=(gamemode)=>{
    //Easy 1- 32    Med 2- 28   Hard -3 22

    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            hiddenSudokuarr[i][j]= sudokuarr[i][j];

        }}
     //hiddenSudokuarr= Array.from(sudokuarr);

    switch(gamemode){
        case(1):
            //start easy mode
            callHide(26);
        break;

        case(2):
          //start hard mode
           callHide(23);
        break;

        case(3):
          //start medium mode
          callHide(19);
        break;
    }//end of switch statement

    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            hiddenSudokuclone[i][j]=   hiddenSudokuarr[i][j];

        }}

    

}//end of function hidesudoku

 

const callHide=(numberofit)=>{
   
    for(let l=0;l<(81-numberofit);l++){
        //call random i
        //call random j
        var i= (Math.trunc(Math.random()*10))%9;
        var j= (Math.trunc(Math.random()*10))%9;
         hiddenSudokuarr[i][j]=" ";
        //console.log("Random i is "+i +", j is "+j);
    }

}

export{sudokuarr,fillsudokuarr,printSudoku,hideSudoku,hiddenSudokuarr,hiddenSudokuclone}