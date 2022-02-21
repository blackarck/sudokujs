import usermodel from "./data/user";
import firebase from "firebase/app";
import dotenv from "dotenv";




export default class loginsrvc {
  userdata;
  isloggedin = false;

  constructor() {
    //console.log(require("dotenv").config())
    dotenv.config();

    this.userdata = new usermodel();
  }

  getIsLogin() {
    return this.isloggedin;
  }

  glogin = () => {
    return new Promise(async (resolve, reject) => {
      var user = firebase.auth().currentUser;
      //console.log("user is " + JSON.stringify(user));
      // firebase.auth().onAuthStateChanged(async(user) => {
      if (user) {
        //show logout button instead + username
        //console.log("If user");
        await this.fetchResult(user);
        this.isloggedin = true;
        //api to send data to backend
        resolve({ success: true });

        //do nothing
      } else {
        //console.log("Auth state change in else");
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        firebase
          .auth()
          .signInWithPopup(googleAuthProvider)
          .then(async (user) => {
            //console.log("result is user " + JSON.stringify(user));
            var usernm = firebase.auth().currentUser;
            await this.fetchResult(usernm);
            this.isloggedin = true;
            resolve({ success: true });
          });
      }
      //})
      // set state of showlogin to false
    }); //end of promise
  }; //end of glogin function

  getUserIDToken() {
    return firebase.auth().currentUser?.getIdToken(true);
  }

  getLoginUserDtl() {
    var userdtls = localStorage.getItem("userName");
    //console.log("fetched data for " + userdtls.displayname);
    return userdtls;
  }

  fetchResult = async (user) => {
    return new Promise((resolve, reject) => {
      //console.log("user is " + " " + user.displayName);

      var userdata = new usermodel();
      userdata.displayname = user.displayName;
      userdata.emailid = user.email;
      userdata.userid = user.uid;
      userdata.photourl = user.photoURL;

      //console.log("Setting " + userdata.displayname);
      localStorage.setItem("userdata", userdata);
      localStorage.setItem("userName", userdata.displayname);
      localStorage.setItem("loginstate", true);

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
          body: JSON.stringify(userdata),
        };
        console.log("Calling url "+ JSON.stringify(process.env));

        fetch(process.env.REACT_APP_CALLURL+"/api/user/login", requestOptions)
          .then((data) => data.json())
          .then((result) => {
            // console.log(
            //   "res is " + JSON.stringify(result) + " for" + userdata.displayname
            // );
            // console.log("Setting local storage");

            //console.log("uname3 is " + localStorage.getItem("userName"));
            resolve(result);
          });
      }); //end of promise
    }); //end of getuseridtoken
  }; //end of fetch result

  glogout = () => {
    return new Promise((resolve, reject) => {
      //console.log("Logging out user ");
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.isloggedin = false;
          //console.log("Logout complete ");
          localStorage.clear();
          resolve({ success: true });
        });
    }); //end of promise
  };

  startMultiGame = async() => {
    return new Promise((resolve, reject) => {
      this.getUserIDToken()?.then((restoken) => {

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT",
            authorization: restoken,
          },
          // body: JSON.stringify({"data":"This is payload"}),
        };
        fetch(process.env.REACT_APP_CALLURL+"/api/multigm/startmgm", requestOptions)
        .then((data) => data.json())
        .then((result) => {
          resolve(result);
        });
      });//end of getuseridtoken

    });//end of promise
  }

} //end of loginsrvc class

