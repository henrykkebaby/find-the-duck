import React from 'react';
import "../styles.css";

function Login(props) {
    return (
        <div className = "loginContainer">
        
            <div className = "fieldBox" onKeyDown={(e) => props.login(e)}>
                <h1>Login</h1>
                <input type = "text" placeholder="Email..." onChange={(e) => {props.setLoginEmail(e.target.value)}}/>
                <input  type = "password" placeholder="Password..." onChange={(e) => {props.setLoginPassword(e.target.value)}}/>
                <p style={{color:"red"}}>{props.errorMessage}</p>
                <button onClick = {() => props.login("clicked")}>Login</button> 
            </div>

        </div>
    )
}

export default Login;
