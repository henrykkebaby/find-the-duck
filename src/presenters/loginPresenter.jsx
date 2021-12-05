import React,{useState} from 'react';

import Login from "../views/login";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase/firebase-config";

function LoginPresenter(props) {

 const [loginEmail, setLoginEmail] = useState("")
 const [loginPassword, setLoginPassword] = useState("")
 const [errorMessage, setErrorMessage] = useState("");
 const [user, setUser] = useState({});
 
 onAuthStateChanged(auth, (currentUser) =>{
  setUser(currentUser)
})

 async function login(){
  
    try{
      const user =  await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      console.log(user)
    }

    catch(error){
      console.log(error.message)
    }
  
  }


    return (
        <div>
            <Login
            model = {props.model}
            loginEmail = {loginEmail}
            setLoginEmail = {setLoginEmail}
            loginPassword = {loginPassword}
            setLoginPassword = {setLoginPassword}
            login = {login}
            user = {user}
            errorMessage = {errorMessage}
            setErrorMessage = {setErrorMessage}
            />
        </div>
    )
}

export default LoginPresenter
