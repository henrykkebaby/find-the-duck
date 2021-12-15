import React from 'react';
import { Link } from 'react-router-dom';
import "../styles.css";

function ProfileView(props) {
    return (
        <div>
            <div className = "profileBackground">
                {props.profilePic?
                <img onClick={() => props.swap()} src={props.profilePic} className = "profileImg" alt="duck" />
                :
                <img src ="http://www.csc.kth.se/~cristi/loading.gif"  alt="spinner"/>
                }
                <p>{props.profileName}</p>
                <Link to = "/"> <button onClick={() => props.saveChanges()} style={{width:"100%"}}>Save Changes</button></Link>
            </div>
    
        </div>
    )
}

export default ProfileView;