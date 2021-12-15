import React from 'react';
import { Link } from 'react-router-dom';
import quickquack from '../sounds/quickquack.wav';
import duckpic from '../localfiles/duck.png';
import "../styles.css";

function NotFoundView(props) {

    var quack = new Audio (quickquack);

    return (
        <div style={{backgroundColor:"#1a67ab"}}>
            <p id = "errorText" >404 Not Found</p>
            <img src={duckpic} width="120px" height="120px" alt="duck" />
            <br />
            <br />
            <br />
            <Link to = "/"> <button onClick={() => quack.play()}>Goto main page</button> </Link>
        </div>
    )
}

export default NotFoundView;