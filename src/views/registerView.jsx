import React from 'react';

function RegisterView(props) {
    return (
        <div className = "registerContainer">

            <div className = "fieldBox" onKeyDown={(e) => props.register(e)} >
                <h1>Register</h1>
                <input type = "text" placeholder="Email..." maxLength="35" onChange={(e) => {props.setRegisterEmail(e.target.value)}}/>
                <input  type = "password" placeholder="Password..." onChange={(e) => {props.setRegisterPassword(e.target.value)}}/>
                <span style={{color:"red"}}>{props.errorMessage}</span>
                <button onClick = {() => props.register("clicked")}>Signup</button>
            </div>

        </div>
    )
}

export default RegisterView;