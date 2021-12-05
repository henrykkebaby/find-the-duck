import React from 'react'
import "../styles.css";
import { Link } from 'react-router-dom';
function Login(props) {
    return (
        <div className = "loginContainer">
        
           <div className = "fieldBox">
          <h1>Login</h1>
          <input type = "text" placeholder="Email..." onChange={(e) => {props.setLoginEmail(e.target.value)}}/>
          <input  type = "password" placeholder="Password..." onChange={(e) => {props.setLoginPassword(e.target.value)}}/>
          {props.errorMessage?alert(props.errorMessage)&& props.setErrorMessage(null):
            ""
        }
         {props.user?
              (<Link to = "/">
                 <button onClick = {props.login}>Login</button>
             </Link>) 
             :  <button onClick = {props.login}>Login</button> }
       </div>

        </div>
    )
}

export default Login;
