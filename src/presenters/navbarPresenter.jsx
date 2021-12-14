import React, { useState } from 'react';
import NavbarView from '../views/navbarView';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

function NavbarPresenter(props) {

    const [user, setUser] = useState({});

    async function logout(){
       await signOut(auth);
    }
    onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser);
    })

    return (
        <div>
            <NavbarView
            user = {user}
            logout = {logout}
            navbar = {props.navbar}
            />
        </div>
    )
}

export default NavbarPresenter;