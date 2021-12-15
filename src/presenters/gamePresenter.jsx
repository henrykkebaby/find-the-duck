import React, { useState, useEffect } from 'react';
import GameView from '../views/gameView';
import TimerView from '../views/timerView';
import EndscreenView from '../views/endscreenView';
import GameStatsView from '../views/gameStatsView';
import LoadscreenView from '../views/loadscreenView';
import GameSource from "../gameSource";
import duckPic from '../localfiles/duck.png';
import duckLoad from '../localfiles/321duck.mp4';
import promiseNoData from '../views/promiseNoData';
import quickquack from '../sounds/quickquack.wav';
import doublequack from '../sounds/doublequack.wav';
import HighscoreView from '../views/highscoreView';

//Firebase
//import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../firebase/firebase-config";
// import { onAuthStateChanged } from "firebase/auth";

function GamePresenter(props) {

  //config
  const CONF_ROUND = 5;
  const CONF_TIME = 30;
  const CONF_SEARCH = "find waldo hard";
  const CONF_BLOCKED_SEARCH = [30, 8, 12, 34];
  const CONF_BACKGROUND_HEIGHT = 600;
  const CONF_BACKGROUND_WIDTH = 800;
  const CONF_DUCK_HEIGHT = 22;
  const CONF_DUCK_WIDTH = 20;
  
  //locals
  function getRandomPosDuck(rowOrCol){
    if(document.getElementById("duckspace") != null){
        if(rowOrCol === 0){
          return Math.random()*(CONF_BACKGROUND_WIDTH - CONF_DUCK_WIDTH);
        }
        else{
          return Math.random()*(CONF_BACKGROUND_HEIGHT - CONF_DUCK_HEIGHT) + document.getElementById("duckspace").getBoundingClientRect().top;
        }
      }
    return Math.random()*(CONF_BACKGROUND_HEIGHT - CONF_DUCK_HEIGHT) + 70; 
  }
  
  //duck audio
  const quacks = [new Audio (quickquack), new Audio (doublequack)];
  const quack = quacks[Math.floor(Math.random()*quacks.length)];
  
  //hooks

  //logic
  const [duckPosX, setDuckPosX] = useState(getRandomPosDuck(0));
  const [duckPosY, setDuckPosY] = useState(getRandomPosDuck(1));
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState([]);
  const [personalHighscore, setPersonalHighscore] = useState([-Infinity]);

  //cache
  const [videoID, setVideoID] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [background, setBackground] = useState(null);

  //game state
  const [showVid, setShowVid] = useState("");
  const [showEnd, setShowEnd] = useState("none");
  const [showDuck, setShowDuck] = useState("none");

  //firebase hooks
  //const [user, setUser] = useState({});

  function backgroundFunc(data) {
    let rand = Math.floor(Math.random()*data.length);
    let newBackground = data[rand];
    if (CONF_BLOCKED_SEARCH.includes(rand)) { newBackground.contentUrl = null; }
    while(newBackground.contentUrl === null) {
      rand = Math.floor(Math.random()*data.length);
      newBackground = data[rand];
      if (CONF_BLOCKED_SEARCH.includes(rand)) { newBackground.contentUrl = null; }
    }
    setBackground(newBackground.contentUrl);
  }

  //useEffect
  useEffect(() => {
    props.model.setShowNavCredentials(false);
    props.model.addObserver(() => { GetData(); });
    GetData();
    GameSource.searchImages(CONF_SEARCH).then((data)=>{setSearchResults(data); backgroundFunc(data); } );

    return () => {
      props.model.setShowNavCredentials(true);
      props.model.removeObserver(() => { GetData(); });
    };
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
      setDuckPosX(getRandomPosDuck(0));
      setDuckPosY(getRandomPosDuck(1));
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
  //onAuthStateChanged(auth, (currentUser) =>{ setUser(currentUser) })

  // async function logout() { await signOut(auth); }

  const GetData = async ()=>{

    if(props.model.firebaseData === null) { return; }
    const scoreList = props.model.firebaseData;

    let highscore_length = 10;
    let highscore_list = [];
    let foundPersonalHighscore = !auth.currentUser;
    if(scoreList.length < 10) { highscore_length = scoreList.length; }

    scoreList.sort(compareScore).forEach(function(item) {

      //If we are logged in we are searching for our personal highscore
      if(!foundPersonalHighscore && item.person === auth.currentUser.email) {setPersonalHighscore(item.score); foundPersonalHighscore = true; }
      //If we still arent done with the highscore list we run this
      if(highscore_length > 0) { highscore_list.push([item.person, item.score]); highscore_length = highscore_length - 1;}
      //If we found the personal highscore and the highscore list we leave
      if(highscore_length <= 0 && foundPersonalHighscore) { setHighscore([...highscore_list]); return; }
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
    })

    const scoreList = props.model.firebaseData;

    scoreList.forEach(function(item) {
      if(item.person === auth.currentUser.email) {
          item.score = newScore;
      }
    });
    
    GetData();
  }
  //firebase --------------------------------------

  function gameStateHandler(state){

    if(state === 0) {
      setShowEnd("none");
      setShowDuck("none");
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
      setShowDuck("");
      setSeconds(CONF_TIME);
      setTimerIsActive(true);
      return;
    }

    if(state === 2) {
      setShowVid("none");
      setShowDuck("none")
      setShowEnd("");
      setTimerIsActive(false);
      setSeconds(CONF_TIME);
      return;
    }

  }

  return( 
  promiseNoData(background)

  ||
  
  <div>
            <GameView 
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
              quack={quack}
              showDuck={showDuck}
            />
            
            <GameStatsView
               roundMAX={CONF_ROUND}
               round={round}
               score={score}
               personalHighscore={personalHighscore}
            />

            <EndscreenView
              showEnd = {showEnd}
              height={CONF_BACKGROUND_HEIGHT + "px"}
              width={CONF_BACKGROUND_WIDTH + "px"}
              roundMAX={CONF_ROUND}
              score={score}
              personalHighscore={personalHighscore}
              rerender={rerender}
            />

            <LoadscreenView
               showVid = {showVid}
               height={CONF_BACKGROUND_HEIGHT + "px"}
               width={CONF_BACKGROUND_WIDTH + "px"}
               gameStateHandler = {gameStateHandler}
               duckLoad = {duckLoad}
            />
            
            <TimerView
              seconds = {seconds}
            />

            <div className="highscorebox">
              <HighscoreView highscore={highscore} />
            </div>
  </div>
  )
}

export default GamePresenter;