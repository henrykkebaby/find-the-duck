import React from 'react'
import { auth } from "../firebase/firebase-config";
import { Link } from 'react-router-dom';
import "../styles.css";

function MainPageView(props) {
    return (
        <div>
        <div className = "mainPageContainer">
   
                <button className="mainbtn">
                    <div>
                            <span></span>
                     <Link to = "/game"> Play </Link>
                     </div>
                </button>

                <button className="mainbtn">
                    <div>
                            <span></span>
                     <Link to = "/tutorial"> How to </Link>
                     </div>
                </button>

        </div>
            <p style={{background:"yellow", textAlign:"center"}}> {props.duckFact} </p>
        </div>
    )
}

export default MainPageView;
