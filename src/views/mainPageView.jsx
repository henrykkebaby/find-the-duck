import React from 'react'
import { Link } from 'react-router-dom';
import "../styles.css";

function MainPageView(props) {
    return (
        <div>
            <div className = "mainPageContainer">
    
                <button className="mainbtn" onClick={() => props.quack.play()}>
                    <div>
                            <span></span>
                    <Link to = "/game">{props.text}</Link>
                    </div>
                </button>

                <button className="mainbtn">
                    <div>
                            <span></span>
                    <Link to = "/tutorial"> How to </Link>
                    </div>
                </button>

            </div>
            <p className="funFact"> {props.duckFact} </p>
        </div>
    )
}

export default MainPageView;

