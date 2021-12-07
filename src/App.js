import './App.css';
import './styles.css';
import Model from "./models/model";
import Game from './presenters/gamePresenter';
import MainPagePresenter from './presenters/mainPagePresenter.jsx';
import LoginPresenter from "./presenters/loginPresenter"
import { Routes, Route } from 'react-router-dom';
import NavbarPresenter from './presenters/navbarPresenter';
import RegisterPresenter from "./presenters/registerPresenter";

function App() {
  
  const model = new Model();

  return (
    <Routes>

      <Route path="/" element={
        <div>
          <NavbarPresenter model={model} />
          <MainPagePresenter model={model}/>
        </div>
      }/>
      
      <Route path = "login" element= {
        <div>
        <NavbarPresenter model={model} />
        <LoginPresenter model = {model}/>
        </div>
      }/>

      <Route path = "register" element= {
        <div>
        <NavbarPresenter model={model} />
        <RegisterPresenter model = {model}/>
        </div>
      }/>
      
      <Route path="/game" element={<Game model={model} />} />

    </Routes>   
  );
}

export default App;
