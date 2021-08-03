import firebase from "firebase/app";

export default class gamesrvc {
  constructor() {}

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

        fetch("https://localhost:3000/api/user/savegame", requestOptions)
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

  loadgame = async (gameid) => {
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
          params: { gid: gameid },
        };

        fetch("https://localhost:3000/api/user/loadgame", requestOptions)
          .then((data) => data.json())
          .then((result) => {
            // console.log("loaded game is " + JSON.stringify(result));
            resolve(result);
          });
      }); //end of promise
    }); //end of getuseridtoken
  }; //end of fetch result
} // end of gamesrvc class
