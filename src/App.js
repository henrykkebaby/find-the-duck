import './styles.css';
import happyMusicLow from './sounds/happylow.wav';
import React, { useEffect } from 'react';
import Model from "./models/model";
import Game from './presenters/gamePresenter';
import MainPage from './presenters/mainPagePresenter.jsx';
import Login from "./presenters/loginPresenter"
import { Routes, Route } from 'react-router-dom';
import Navbar from './presenters/navbarPresenter';
import Register from "./presenters/registerPresenter";
import Profile from "./presenters/profilePresenter";
import Tutorial from "./presenters/tutorialPresenter";
import NotFound from "./views/notFoundView";

//Firebase
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "./firebase/firebase-config";

const model = new Model();
model.setMusic((new Audio(happyMusicLow)));

function App() {

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
          <MainPage model={model} />
        </div>
      }/>
      
      <Route path = "login" element= {
        <div>
        <Navbar model={model} />
        <Login model = {model} />
        </div>
      }/>

      <Route path = "register" element= {
        <div>
        <Navbar model={model} />
        <Register model = {model} />
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
      
      <Route path="/game" element={
        <div>
        <Navbar model = {model} />
        <Game model={model} />
        </div>
      }/>
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
