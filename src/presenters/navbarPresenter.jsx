import React,{useState} from 'react'
import Navbar from '../views/navbar';
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "firebase/auth"
import { auth } from "../firebase/firebase-config"
function NavbarPresenter() {

    const [user, setUser] = useState({});

    async function logout(){
       await signOut(auth);
      }
    onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser)
      })

    return (
        <div>
            <Navbar
            user = {user}
            logout = {logout}
            />
        </div>
    )
}

export default NavbarPresenter;
