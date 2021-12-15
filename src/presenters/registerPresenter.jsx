import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

import RegisterView from "../views/registerView";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore/lite";
import { db } from "../firebase/firebase-config";

function RegisterPresenter(props) {

  const navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("");

  const SetData = async () =>{
    const person = auth.currentUser.email;
    const personString = String(person);

    await setDoc(doc(db, "scores", personString), { 
      person: person,
      score: -Infinity
    });

    props.model.addFirebaseData({person:person, score:-Infinity});
  }

  async function register(key){
   
    
    if((key === null) || (key.code !== "Enter" && key !== "clicked")) {
      return;
    }
      
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      SetData();
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

  return  <div>
              <RegisterView
              model={props.model} 
              registerEmail={registerEmail}
              setRegisterEmail = {setRegisterEmail}
              registerPassword = {registerPassword}
              setRegisterPassword = {setRegisterPassword}
              register = {register}
              errorMessage = {errorMessage}  
              />
          </div>
      
}

export default RegisterPresenter;