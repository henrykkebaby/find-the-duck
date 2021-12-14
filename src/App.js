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

const model = new Model();

function App() {

  const [navbar, setNavbar] = useState(true);

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
          <Navbar model={model} navbar = {navbar}/>
          <MainPage model={model} />
        </div>
      }/>
      
      <Route path = "login" element= {
        <div>
        <Navbar model={model} navbar = {navbar}/>
        <Login model = {model}/>
        </div>
      }/>

      <Route path = "register" element= {
        <div>
        <Navbar model={model} navbar = {navbar} />
        <Register model = {model}/>
        </div>
      }/>

      <Route path = "profile" element= {
        <div>
        <Navbar model={model} navbar = {navbar} />
        <Profile model={model} />
        </div>
      }/>

      <Route path = "tutorial" element= {
        <div>
        <Navbar model={model} navbar = {navbar} />
        <Tutorial model={model} />
        </div>
      }/>
      
      <Route path="/game" element={
        <div>
        <Navbar model = {model}  navbar = {navbar}/>
        <Game model={model} setNavbar = {setNavbar} />
        </div>
      }/>
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
