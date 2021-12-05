import React from 'react'
import { auth } from "../firebase/firebase-config";
import { Link } from 'react-router-dom';
import "../styles.css";

function MainPage() {
    return (
        <div className = "mainPageContainer">
           
    <Link to = "/game">
        <button>Play</button>
    </Link>
           <button>How to</button>
        </div>
    )
}

export default MainPage;
