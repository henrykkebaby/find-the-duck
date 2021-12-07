import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

import Register from "../views/register";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase/firebase-config"

function RegisterPresenter(props) {

  const navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("");


async function register(){
     
  try {
    await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
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
          case 'Firebase: Error (auth/email-already-in-use).':
            setErrorMessage('Email is already in use');
            break;
        default:
          setErrorMessage('Unknown Error');
      }
      
    }
}

   
return (
        <div>
            <Register
            model={props.model} 
            registerEmail={registerEmail}
            setRegisterEmail = {setRegisterEmail}
            registerPassword = {registerPassword}
            setRegisterPassword = {setRegisterPassword}
            register = {register}
            errorMessage = {errorMessage}  
            />
        </div>
    )
}

export default RegisterPresenter;
