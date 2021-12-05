import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from "../firebase/firebase-config"
import "../index.css"
function Index(props) {
  return (
    <div>
       <div>
         <h3>Register User</h3>
         <input type = "text" placeholder = "Email..." onChange={(e) => {props.setRegisterEmail(e.target.value)}}/>
         <input type = "password" placeholder ="Password..." onChange={(e) => {props.setRegisterPassword(e.target.value)}}/>

         <button onClick = {props.register}>Create User</button>
         <h1>{props.errorMessage}</h1>
      </div>


      <div>
          <h3>Login</h3>
          <input type = "text" placeholder="Email..." onChange={(e) => {props.setLoginEmail(e.target.value)}}/>
          <input  type = "password" placeholder="Password..." onChange={(e) => {props.setLoginPassword(e.target.value)}}/>

          <button onClick = {props.login}>Login</button>

      </div>

      <h4>User Logged In:</h4>
       {props.user?(
          <div>
          <Link to = "/game">
          <button>Enter the world of ducks!</button>
          </Link>
          <button onClick = {props.logout}>Sign out</button>
          </div>) : ""}
       
    
   
     
     
    </div>
  )
}

export default Index;

 

{/*  <p>Press Button to goto Duck game</p>
        <Link to="/game">
            <button>
                LOG IN
            </button>
        </Link> */}

        