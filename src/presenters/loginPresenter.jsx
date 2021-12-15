import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import LoginView from "../views/loginView";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

function LoginPresenter(props) {

  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) =>{
    setUser(currentUser);
  })

  async function login(key) {

    if((key === null) || (key.code !== "Enter" && key !== "clicked")) {
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setErrorMessage("");
      navigate('/');
    } catch(error) {

        switch (error.message) {
          case 'Firebase: Error (auth/internal-error).':
            setErrorMessage('Please enter a valid Email and Password');
            break;
          case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
            setErrorMessage('Password needs to be atleast 6 characters long');
            break;
            case 'Firebase: Error (auth/invalid-email).':
              setErrorMessage('Please enter a valid Email');
              break;
            case "Firebase: Error (auth/missing-email).":
              setErrorMessage('Please enter a valid Email');
              break;
            case 'Firebase: Error (auth/user-not-found).':
              setErrorMessage('This account does not exist');
              break;
            case 'Firebase: Error (auth/wrong-password).':
              setErrorMessage('Wrong Email or Password');
              break;
          default:
            setErrorMessage('Unknown Error');
        }
      }
  }

    return (
        <div>
            <LoginView
            model = {props.model}
            loginEmail = {loginEmail}
            setLoginEmail = {setLoginEmail}
            loginPassword = {loginPassword}
            setLoginPassword = {setLoginPassword}
            login = {login}
            user = {user}
            errorMessage = {errorMessage}
            />
        </div>
    )
}

export default LoginPresenter;