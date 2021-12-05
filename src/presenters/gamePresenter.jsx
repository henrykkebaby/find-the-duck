import React, {useState, useEffect } from 'react';
import GameView from '../views/gameView';
import TimerView from '../views/timerView';
import GameSource from "../gameSource";
import backgroundPic1 from '../localfiles/background1.jpg';
import backgroundPic2 from '../localfiles/background2.jpg';
import backgroundPic3 from '../localfiles/background3.jpg';
import duckPic from '../localfiles/duck.png';

//Firebase
import {signOut} from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { collection, getDocs, doc, setDoc } from "firebase/firestore/lite";
import { db } from "../firebase/firebase-config";
import { onAuthStateChanged} from "firebase/auth"


function GamePresenter(props) {

  //locals
  
  //height, width, BackgroundNumber, backgroundPic, localImgResults, 
  let localBackground = [500, 500, Math.floor(Math.random() * 35)]; //change later to length of data
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

  //firebase hooks
  const [user, setUser] = useState({});


  //useEffect
  useEffect(() => {
    console.log("DuckPresenter Ready!");
    GetData();
    //props.model.addObserver(() => { setHighscore(props.model.highscore); });
    GameSource.searchImages("ducks").then((data)=>{setSearchResults(data); setBackground(data[0].contentUrl); } );
  }, []);

  // flags[0] = boolean trigger rerender
  function rerender(points, flags) {
    if(flags[0]){

      setDuckPosX(localDuckPos[0]);
      setDuckPosY(localDuckPos[1]);
      setBackground(searchResults[localBackground[2]].contentUrl);
      setSeconds(30);

      if(round >= 3)
      {
        //props.model.addHighscore(score + points);
        SetData(score + points);
        setRound(1);
        setScore(0);
        return;

      } else { setRound(round + 1); }

    }
    setScore(score + points);
  }

  //TIMER -----------------------------------------
  const [seconds, setSeconds] = useState(30);
  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      if(seconds <= 0){rerender(-500, [true]); setSeconds(30); }
      else{rerender(-5, [false]); setSeconds(seconds => seconds - 1); }     
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, score]);
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
    const person = auth.currentUser.email;
    const personString = String(person);
    const score = newScore;
    //console.log("Set data is trying to set the score: " + score);
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
    />
    <TimerView
        seconds = {seconds}
      />
  </div>
}

export default GamePresenter