import React, {useState} from 'react';
import Register from "../views/register"
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "firebase/auth"
import { auth } from "../firebase/firebase-config"

function RegisterPresenter(props) {

const [registerEmail, setRegisterEmail] = useState("")
const [registerPassword, setRegisterPassword] = useState("")
const [errorMessage, setErrorMessage] = useState("");


async function register(){
    if(errorMessage !== ""){
      setErrorMessage("");
    }
     
     try{
       const user =  await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
       
     
     }
 
     catch(error){
       console.log(error.message)
       if(error.message = "auth/weak-password")  setErrorMessage("Password should atleast be 6 characters long");
       else if(error.message = "auth/email-already-in-use")  setErrorMessage("Email already in use");
      
       
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
            setErrorMessage = {setErrorMessage}
            
            />
        </div>
    )
}

export default RegisterPresenter;
