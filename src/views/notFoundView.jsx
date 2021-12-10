import React from 'react';
import { Link } from 'react-router-dom';
import quickquack from '../sounds/quickquack.wav';

function NotFoundView(props) {

    var quack = new Audio (quickquack);

    return (
        <div style={{backgroundColor:"#1a67ab"}}>
            <p style={{color:"white"}}>404 Not Found</p>
            <Link to = "/"> <button onClick={() => quack.play()}>Goto main page</button> </Link>
        </div>
    )
}

export default NotFoundView;