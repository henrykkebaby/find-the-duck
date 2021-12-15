import React from 'react';
import { Link } from 'react-router-dom';
import "../styles.css";
import muted from '../localfiles/muted.png';
import unmuted from '../localfiles/unmuted.png';

function NavbarView(props) {
    return (
        <div>
            <nav className="Navbar">
                
                <Link to = "/" style={{ textDecoration: "none", color:"#1a67ab"}}><h1 >Find The Duck</h1></Link>
                
                <ul>
                {props.showNav?

                    props.user?
        
                        (
                            <div className = "test">
                            {props.user.email}
                            <li> <Link  to = "/profile" style={{ textDecoration: "none", color:"#1a67ab"}}>Profile</Link> </li>
                            <li> <Link  to = "/" style={{ textDecoration: "none", color:"#1a67ab"}}><button onClick = {props.logout}>Sign out</button></Link> </li>
                            </div>
                        ):(
                            <div className ="test">
                            <li><Link  to = "/login" style={{ textDecoration: "none", color:"#1a67ab"}}>Login</Link> </li>
                            <li><Link  to = "/register" style={{ textDecoration: "none", color:"#1a67ab"}}>Register</Link> </li>
                            </div>
                        )
                    :
                    <li> <Link  to = "/" style={{ textDecoration: "none", color:"#1a67ab"}} >Exit Game</Link> </li>    

                }
    
                {props.isPlayingMusic?
                <button className="mute" onClick={() => { props.model.music.pause(); props.setIsPlayingMusic(false); } }><input className="mute" type ="image" src={unmuted} alt="unmute" /></button>
                :
                <button className="mute" onClick={() => { props.model.music.play(); props.setIsPlayingMusic(true); props.model.music.loop = true } }><input className="mute" type ="image" src={muted} alt="mute" /></button>
                }

                </ul>
            </nav>
        </div>
    )
}

export default NavbarView;


