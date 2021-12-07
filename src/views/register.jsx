import React from 'react'

function Register(props) {
    return (
        <div className = "registerContainer">

            <div className = "fieldBox">
                <h1>Register</h1>
                <input type = "text" placeholder="Email..." onChange={(e) => {props.setRegisterEmail(e.target.value)}}/>
                <input  type = "password" placeholder="Password..." onChange={(e) => {props.setRegisterPassword(e.target.value)}}/>
                <span style={{color:"red"}}>{props.errorMessage}</span>
                <button onClick = {() => props.register()}>Signup</button>
            </div>

        </div>
    )
}

export default Register;
