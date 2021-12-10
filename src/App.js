import './App.css';
import './styles.css';
import Model from "./models/model";
import Game from './presenters/gamePresenter';
import MainPage from './presenters/mainPagePresenter.jsx';
import Login from "./presenters/loginPresenter"
import { Routes, Route } from 'react-router-dom';
import Navbar from './presenters/navbarPresenter';
import Register from "./presenters/registerPresenter";
import Profile from "./presenters/profilePresenter";
import Tutorial from "./presenters/tutorialPresenter";
import NotFound from "./views/notFoundView"

function App() {
  
  const model = new Model();

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
