import React from 'react';
import { Link } from 'react-router-dom';
import quickquack from '../sounds/quickquack.wav';
import duckpic from '../localfiles/duck.png';

function NotFoundView(props) {

    var quack = new Audio (quickquack);

    return (
        <div style={{backgroundColor:"#1a67ab"}}>
            <p style={{color:"white", fontSize:"70px"}}>404 Not Found</p>
            <img src={duckpic} width="120px" height="120px" />
            <br />
            <br />
            <br />
            <Link to = "/"> <button onClick={() => quack.play()}>Goto main page</button> </Link>
        </div>
    )
}

export default NotFoundView;