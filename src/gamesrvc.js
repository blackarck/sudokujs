import firebase from "firebase/app";
import { io } from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();

export default class gamesrvc {
  //socket=io("https://localhost:3000/");
  constructor() {
    console.log("Initialize game service " + process.env.CALLURL);

    /*
    this.socket.on('handshake',()=>{
    console.log("Handshake from server");
   });
*/
    console.log("Post handshake");
  }

  getUserIDToken() {
    return firebase.auth().currentUser?.getIdToken(true);
  }

  savegame = async (gamedata) => {
    return new Promise((resolve, reject) => {
      let datatosend = {
        currentstate: gamedata.currentstate,
        completestate: gamedata.completestate,
        hiddenstate: gamedata.hiddenstate,
        win: 0,
        finishtime: 0,
      };
      this.getUserIDToken()?.then((restoken) => {
        // console.log("restoken is "+restoken);
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            authorization: restoken,
          },
          body: JSON.stringify(datatosend),
        };

        fetch(
          process.env.REACT_APP_CALLURL + "/api/user/savegame",
          requestOptions
        )
          .then((data) => data.json())
          .then((result) => {
            //console.log("res is " + JSON.stringify(result));
            if (result.success && result.savegame) {
              alert("Game saved !");
            }
            resolve(result);
          });
      }); //end of promise
    }); //end of getuseridtoken
  }; //end of fetch result

  savegameforShare = async (gamedata) => {
    return new Promise((resolve, reject) => {

      let datatosend = {
        currentstate: gamedata.currentstate,
        completestate: gamedata.completestate,
        hiddenstate: gamedata.hiddenstate
      };
     
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT"
          },
          body: JSON.stringify(datatosend),
        };

        fetch(
          process.env.REACT_APP_CALLURL + "/api/user/savegameshare",
          requestOptions
        )
          .then((data) => data.json())
          .then((result) => {
            //console.log("res is " + JSON.stringify(result));
            
            resolve(result);
          });
      }); //end of promise
    
  }; //end of savegameforShare


  loadgame = async (gameid) => {
    return new Promise((resolve, reject) => {
      this.getUserIDToken()?.then((restoken) => {
        // console.log("restoken is "+restoken);
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            authorization: restoken,
          },
          body: JSON.stringify({ gid: gameid }),
        };

        fetch(
          process.env.REACT_APP_CALLURL + "/api/user/loadgame",
          requestOptions
        )
          .then((data) => data.json())
          .then((result) => {
            // console.log("loaded game is " + JSON.stringify(result));
            resolve(result);
          });
      }); //end of promise
    }); //end of getuseridtoken
  }; //end of fetch result

  loadgameID = async (gameid) => {
    return new Promise((resolve, reject) => {
      // console.log("gameid is "+gameid);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT",
        },
        body: JSON.stringify({ gid: gameid }),
      };

      fetch(
        process.env.REACT_APP_CALLURL + "/api/user/loadgameid",
        requestOptions
      )
        .then((data) => data.json())
        .then((result) => {
          // console.log("loaded game is " + JSON.stringify(result));
          resolve(result);
        });
    }); //end of promise
  }; //end of fetch result

  delGame = async (gameid) => {
    return new Promise((resolve, reject) => {
      this.getUserIDToken()?.then((restoken) => {
        // console.log("restoken is "+restoken + " ,gameid "+gameid);
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            authorization: restoken,
          },
          body: JSON.stringify({ gid: gameid }),
        };
        fetch(
          process.env.REACT_APP_CALLURL + "/api/user/delgame",
          requestOptions
        )
          .then((data) => data.json())
          .then((result) => {
            // console.log("loaded game is " + JSON.stringify(result));
            resolve(result);
          });
      }); //end of getuseridtoken
    }); //end of promise
  }; //end of delgame

  showAllGames = async () => {
    return new Promise((resolve, reject) => {
      this.getUserIDToken()?.then((restoken) => {
        // console.log("restoken is "+restoken);
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            authorization: restoken,
          },
        };

        fetch(
          process.env.REACT_APP_CALLURL + "/api/user/showgames",
          requestOptions
        )
          .then((data) => data.json())
          .then((result) => {
            //console.log("loaded game is " + JSON.stringify(result));
            resolve(result);
          });
      }); //end of getidtoken
    }); //end of promise
  }; //end of showallgames

  sendSocketMsg() {}
} // end of gamesrvc class
