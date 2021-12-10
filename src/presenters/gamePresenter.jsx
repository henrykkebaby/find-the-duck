import React, { useState, useEffect } from 'react';
import GameView from '../views/gameView';
import TimerView from '../views/timerView';
import GameSource from "../gameSource";
import duckPic from '../localfiles/duck.png';
import duckLoad from '../localfiles/321duck.mp4';
import promiseNoData from '../views/promiseNoData';

//Firebase
import {signOut} from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../firebase/firebase-config";
import { onAuthStateChanged} from "firebase/auth";


function GamePresenter(props) {

  //config
  const CONF_ROUND = 3;
  const CONF_TIME = 15;
  const CONF_SEARCH = "ducks";
  const CONF_BACKGROUND_HEIGHT = 600;
  const CONF_BACKGROUND_WIDTH = 800;
  const CONF_DUCK_HEIGHT = 22;
  const CONF_DUCK_WIDTH = 20;

  //locals
  
  //let localImgResults = [backgroundPic1, backgroundPic2, backgroundPic3];
  let localDuckPos = [Math.random()*(CONF_BACKGROUND_WIDTH - CONF_DUCK_WIDTH), Math.random()*(CONF_BACKGROUND_HEIGHT - CONF_DUCK_HEIGHT)];

  //hooks

  //logic
  const [duckPosX, setDuckPosX] = useState(localDuckPos[0]);
  const [duckPosY, setDuckPosY] = useState(localDuckPos[1]);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState([]);
  const [personalHighscore, setPersonalHighscore] = useState([0]);

  //cache
  const [videoID, setVideoID] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [background, setBackground] = useState(null);

  //game state
  const [showVid, setShowVid] = useState("");
  const [showEnd, setShowEnd] = useState("none");

  //firebase hooks
  const [user, setUser] = useState({});

  function backgroundFunc(data) {
    let newBackground = data[Math.floor(Math.random()*data.length)];
    while(newBackground.contentUrl === null) { newBackground = data[Math.floor(Math.random()*data.length)]; }
    setBackground(newBackground.contentUrl);
  }

  //useEffect
  useEffect(() => {
    console.log("DuckPresenter Ready!");
    GetData();
    GameSource.searchImages(CONF_SEARCH).then((data)=>{setSearchResults(data); backgroundFunc(data); } );
  }, []);

  // flags[0] = boolean trigger rerender, flags[1] = boolean trigger restart
  function rerender(points, flags) {

    //flags[0] = true means we need get new background and rerender game
    if(flags[0]){
      if(round >= CONF_ROUND && !flags[1])
      {
        SetData(score + points);
        setScore(score + points);
        gameStateHandler(2);
        return;
      }
      
      backgroundFunc(searchResults);
      setDuckPosX(localDuckPos[0]);
      setDuckPosY(localDuckPos[1]);
      gameStateHandler(0);
      setSeconds(CONF_TIME);

      //flags[1] = true means we need to reset
      if(flags[1]) {
        setRound(1);
        setScore(0);
        return;
      } else {
        setRound(round + 1);
      }

    }
    setScore(score + points);
  }

  //TIMER -----------------------------------------
  const [seconds, setSeconds] = useState(CONF_TIME);
  const [timerIsActive, setTimerIsActive] = useState(false);
  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      if(!timerIsActive) {return;}
      if(seconds <= 0){rerender(-500, [true, false]); setSeconds(CONF_TIME); }
      else{rerender(-5, [false, false]); setSeconds(seconds => seconds - 1); }     
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, score, timerIsActive]);
  //TIMER -----------------------------------------

  function compareScore(a,b){
    if(a.score < b.score) {return 1;}
    if(a.score > b.score) {return -1;}
    return 0;
  }

  //firebase --------------------------------------
  onAuthStateChanged(auth, (currentUser) =>{ setUser(currentUser) })

  async function logout() { await signOut(auth); }

  const GetData = async ()=>{
    const scoreCol = collection(db, "scores");
    const scoreSnapshot = await getDocs(scoreCol);
    const scoreList = scoreSnapshot.docs.map(doc=>doc.data());
    
    let highscore_length = 10;
    let highscore_list = [];
    let foundPersonalHighscore = !auth.currentUser;
    if(scoreList.length < 10) { highscore_length = scoreList.length; }

    scoreList.sort(compareScore).map(function(item) {

      //If we are logged in we are searching for our personal highscore
      if(!foundPersonalHighscore && item.person === auth.currentUser.email) {setPersonalHighscore(item.score); foundPersonalHighscore = true; }
      //If we still arent done with the highscore list we run this
      if(highscore_length > 0) { highscore_list.push([item.person, item.score]); highscore_length = highscore_length - 1; }
      //If we found the personal highscore and the highscore list we leave
      if(highscore_length <= 0 && foundPersonalHighscore) { setHighscore(highscore_list); return; }
    });
  }
  
  const SetData = async (newScore) =>{
    if(!auth.currentUser) { if(newScore > personalHighscore) {setPersonalHighscore(newScore);} GetData(); return; } //If we arent logged in we set score locally and leave
    if(newScore <= personalHighscore) { GetData(); return; } //If the score wasnt higher that personal best we leave

    const person = auth.currentUser.email;
    const personString = String(person);
    const score = newScore;

    await updateDoc(doc(db, "scores", personString), { 
      score: score
    }).then(() => GetData());
  }
  //firebase --------------------------------------

  function gameStateHandler(state){

    if(state === 0) {
      setShowEnd("none");
      if(videoID === null) {
        const temp = document.getElementById("duck321");
        temp.play();
        setVideoID(temp);
      }
      else { videoID.play(); }
      
      setShowVid("");

      setTimerIsActive(false);
      return;
    }

    if(state === 1) {
      setShowVid("none");
      setShowEnd("none");
      setSeconds(CONF_TIME);
      setTimerIsActive(true);
      return;
    }

    if(state === 2) {
      setShowVid("none");
      setShowEnd("");
      setTimerIsActive(false);
      setSeconds(1337);
      
      return;
    }

  }

  return( 
  promiseNoData(background)

  ||
  
  <div>
            <GameView 
              duckLoad = {duckLoad}
              gameStateHandler = {gameStateHandler}
              showVid = {showVid}
              showEnd = {showEnd}
              rerender={rerender}
              background={background}
              handleImgError= {() => backgroundFunc(searchResults)}
              duckPic={duckPic} 
              posX={duckPosX + "px"}
              posY={duckPosY + "px"}
              height={CONF_BACKGROUND_HEIGHT + "px"}
              width={CONF_BACKGROUND_WIDTH + "px"}
              duckHeight={CONF_DUCK_HEIGHT}
              duckWidth={CONF_DUCK_WIDTH}
              logout = {logout}
              score={score}
              round={round}
              roundMAX={CONF_ROUND}
              highscore={highscore}
              personalHighscore={personalHighscore}
            />
            <TimerView
              seconds = {seconds}
            />
  </div>
  )
}

export default GamePresenter;