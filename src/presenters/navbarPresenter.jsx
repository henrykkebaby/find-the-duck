import React, { useEffect, useState } from 'react';
import NavbarView from '../views/navbarView';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

function NavbarPresenter(props) {

    const [user, setUser] = useState({});
    const [isPlayingMusic, setIsPlayingMusic] = useState(!props.model.music.paused);
    const [showNav, setShowNav] = useState(props.model.showNavbarCredentials);

    useEffect(() => {
        props.model.addObserver(() => setShowNav(props.model.showNavbarCredentials));

        return () => {
            props.model.removeObserver(() => setShowNav(props.model.showNavbarCredentials));
          };
    }, []);

    async function logout(){
       await signOut(auth);
    }
    onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser);
    })

    return (
        <div>
            <NavbarView
                model={props.model}
                isPlayingMusic={isPlayingMusic}
                setIsPlayingMusic={setIsPlayingMusic}
                user={user}
                logout={logout}
                showNav={showNav}
            />
        </div>
    )
}

export default NavbarPresenter;