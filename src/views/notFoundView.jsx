import React from 'react';
import { Link } from 'react-router-dom';
import "../styles.css";

function NotFoundView(props) {
    return (
        <div style={{backgroundColor:"#1a67ab"}}>
            <p style={{color:"white"}}>404 Not Found</p>
            <Link to = "/"> <button>Goto main page</button> </Link>
        </div>
    )
}

export default NotFoundView;