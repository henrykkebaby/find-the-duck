import React from 'react';
import { Link } from 'react-router-dom';
import "../styles.css";

function ProfileView(props) {
    return (
        <div>
            <div style={{position:"absolute", left:"65%", border:"5px solid yellow", backgroundColor:"lightgrey"}}>
                <img onClick={() => props.swap()} src={props.profilePic} style={{display:"block", marginLeft:"auto", marginRight:"auto", height:"82px", width:"70px"}} />
                <p>{props.profileName}</p>
                <Link to = "/"> <button onClick={() => props.saveChanges()} style={{width:"100%"}}>Save Changes</button></Link>
            </div>
    
        </div>
    )
}

export default ProfileView;