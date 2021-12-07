import React, {useState, useEffect } from 'react';
import GameView from '../views/gameView';
import TimerView from '../views/timerView';
import GameSource from "../gameSource";
import backgroundPic1 from '../localfiles/background1.jpg';
import backgroundPic2 from '../localfiles/background2.jpg';
import backgroundPic3 from '../localfiles/background3.jpg';
import duckPic from '../localfiles/duck.png';
import duckLoad from '../localfiles/321duck.mp4';

//Firebase
import {signOut} from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { collection, getDocs, doc, setDoc } from "firebase/firestore/lite";
import { db } from "../firebase/firebase-config";
import { onAuthStateChanged} from "firebase/auth"


function GamePresenter(props) {

  //config
  const CONF_ROUND = 5;
  const CONF_TIME = 30;
  const CONF_SEARCH = "wheres waldo pictures";

  //locals
  
  //height, width, BackgroundNumber, backgroundPic, localImgResults, 
  let localBackground = [500, 500]; //change later to length of data
  //let localImgResults = [backgroundPic1, backgroundPic2, backgroundPic3];
  let localDuckPos = [Math.random()*480, Math.random()*480];

  //hooks

  const [duckPosX, setDuckPosX] = useState(localDuckPos[0]);
  const [duckPosY, setDuckPosY] = useState(localDuckPos[1]);

  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState([]);

  const [searchResults, setSearchResults] = useState(null);

  const [width, setWidth] = useState(localBackground[1]);
  const [height, setHeight] = useState(localBackground[0]);
  const [background, setBackground] = useState(null);

  const [showVid, setShowVid] = useState("");
  const [showGame, setShowGame] = useState("none");

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


  // flags[0] = boolean trigger rerender
  function rerender(points, flags) {

    if(flags[0]){
      backgroundFunc(searchResults);
      setDuckPosX(localDuckPos[0]);
      setDuckPosY(localDuckPos[1]);
      startVideo();
      setSeconds(CONF_TIME);

      if(round >= CONF_ROUND)
      {
        SetData(score + points);
        setRound(1);
        setScore(0);
        return;

      } else { setRound(round + 1); }

    }
    setScore(score + points);
  }


  function endVideo(){
    setShowVid("none");
    setShowGame("");
    
    setSeconds(CONF_TIME);
    setTimerIsActive(true);
  }

  function startVideo(){
    setShowVid("");
    setShowGame("none");
    document.getElementById("duck321").play();
    setTimerIsActive(false);
  }


  //TIMER -----------------------------------------
  const [seconds, setSeconds] = useState(CONF_TIME);
  const [timerIsActive, setTimerIsActive] = useState(false);
  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      if(!timerIsActive) {return;}
      if(seconds <= 0){rerender(-500, [true]); setSeconds(CONF_TIME); }
      else{rerender(-5, [false]); setSeconds(seconds => seconds - 1); }     
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
    if(scoreList.length < 10) { highscore_length = scoreList.length; }

    scoreList.sort(compareScore).map(function(item) {
      highscore_list.push([item.person, item.score]);
      highscore_length = highscore_length - 1;
      if(highscore_list <= 0) { return; }
    });

    setHighscore(highscore_list);
  }
  
  const SetData = async (newScore) =>{
    if(!auth.currentUser) { return; }
    const person = auth.currentUser.email;
    const personString = String(person);
    const score = newScore;

    await setDoc(doc(db, "scores", personString), { 
      score: score,
      person: person,
    }).then(() => GetData());
  }
  //firebase --------------------------------------


  return <div>
            <GameView 
              score={score}
              round={round}
              roundMAX={CONF_ROUND}
              highscore={highscore}
              foundDuck={rerender}
              missedDuck={rerender}
              background={background}
              duckPic={duckPic} 
              posX={duckPosX + "px"}
              posY={duckPosY + "px"}
              height={500 + "px"}
              width={500 + "px"}
              logout = {logout}
              duckLoad = {duckLoad}
              endVideo = {endVideo}
              showVid = {showVid}
              showGame = {showGame}
            />
            <TimerView
              seconds = {seconds}
              showTimer = {showGame}
            />
  </div>
}

export default GamePresenter