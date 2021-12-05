import logo from './logo.svg';
import './App.css';
import './styles.css';
import Model from "./models/model";
import Game from './presenters/gamePresenter';
import Index from './presenters/indexPresenter';
import navbarPresenter from './presenters/navbarPresenter';
import MainPagePresenter from './presenters/mainPagePresenter.jsx';
import LoginPresenter from "./presenters/loginPresenter"
import { Routes, Route } from 'react-router-dom';
import NavbarPresenter from './presenters/navbarPresenter';
import RegisterPresenter from "./presenters/registerPresenter";
import { collection, getDocs, doc, setDoc} from "firebase/firestore/lite"

import {db} from "./firebase/firebase-config";



function App() {

  const GetData = async ()=>{
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc=>doc.data());
    console.log(cityList[0].city_name);
    console.log(cityList[1].city_name);
  }

  const SetData = async ()=>{
    const city ="prestoria";

    await setDoc(doc(db, "cities", "LA"), {
      city_name: city,
    })
  }
  
  const model = new Model();

  return (
   
    
   <Routes>
      <Route path="/" element={<div>
        <NavbarPresenter model={model} />
        <MainPagePresenter model={model}/>
     </div>} />
     
     <Route path = "login" element= {<div>
      <NavbarPresenter model={model} />
      <LoginPresenter model = {model}/>
     </div>}/>
      <Route path = "register" element= {<div>
        <NavbarPresenter model={model} />
        <RegisterPresenter model = {model}/>
        </div>}/>
     
      <Route path="/game" element={<Game model={model} />} />
    </Routes>   
  );
}

export default App;
