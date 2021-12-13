import './styles.css';
import happyMusic from './sounds/happy.wav';
import stressMusic from './sounds/stress.wav';
import React, { useState, useEffect } from 'react';
import Model from "./models/model";
import Game from './presenters/gamePresenter';
import MainPage from './presenters/mainPagePresenter.jsx';
import Login from "./presenters/loginPresenter"
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Navbar from './presenters/navbarPresenter';
import Register from "./presenters/registerPresenter";
import Profile from "./presenters/profilePresenter";
import Tutorial from "./presenters/tutorialPresenter";
import NotFound from "./views/notFoundView";

//Firebase
import { auth } from "./firebase/firebase-config";
import { collection, getDocs, doc, updateDoc  } from "firebase/firestore/lite";
import { db } from "./firebase/firebase-config";
import { onAuthStateChanged} from "firebase/auth";

function App() {
  
  const model = new Model();

  //var music = new Audio(happyMusic);
  //var music = new Audio(stressMusic);
  //music.play();

  const GetData = async () => {
    const scoreCol = collection(db, "scores");
    const scoreSnapshot = await getDocs(scoreCol);
    const scoreList = scoreSnapshot.docs.map(doc=>doc.data());
    model.setfirebaseData(scoreList);
  }
  useEffect(()=>{ GetData(); }, []);

  return (
    <Routes>

      <Route path="/" element={
        <div>
          <Navbar model={model} />
          <MainPage model={model}/>
        </div>
      }/>
      
      <Route path = "login" element= {
        <div>
        <Navbar model={model} />
        <Login model = {model}/>
        </div>
      }/>

      <Route path = "register" element= {
        <div>
        <Navbar model={model} />
        <Register model = {model}/>
        </div>
      }/>

      <Route path = "profile" element= {
        <div>
        <Navbar model={model} />
        <Profile model={model} />
        </div>
      }/>

      <Route path = "tutorial" element= {
        <div>
        <Navbar model={model} />
        <Tutorial model={model} />
        </div>
      }/>
      
      <Route path="/game" element={<Game model={model} />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
