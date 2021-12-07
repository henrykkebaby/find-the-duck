import React from 'react';

import { Link } from 'react-router-dom';


function GameView(props) {
  return (
    <div>
        <div style={{display: props.showGame}}>
            <img style={{position:"absolute", userSelect:"none"}} height={props.height} width={props.width} src={props.background} onClick={() => props.missedDuck(-100, [false])} />
            <img style={{position:"absolute", top:props.posY, left:props.posX, userSelect:"none"}} height="22px" width="20px" src={props.duckPic} onClick={() => props.foundDuck(300, [true])}/>
        </div>

        <p style={{position:"absolute", top:"490px", userSelect:"none"}} >ROUND {props.round}</p>
        <p style={{position:"absolute", top:"520px", userSelect:"none", display:props.showGame}} >SCORE {props.score}</p>

        <p style={{position:"absolute", top:"620px", userSelect:"none"}} >HIGHSCORE {props.highscore.toString()}</p>
        
        <Link to="/" style={{position:"absolute", top:"600px"}}>
            <button onClick = {props.logout}>
                LOG OUT
            </button>
        </Link>

        <Link to="/" style={{position:"absolute", top:"700px"}}>
            <button>
                EXIT GAME
            </button>
        </Link>


        <video id="duck321" autoPlay muted onEnded={()=> props.endVideo()} style={{position:"absolute", top: "0px", userSelect:"none", display: props.showVid, height:"500px", width:"500px"}}> <source src= {props.duckLoad} type="video/mp4"/></video>

    </div>
    
  );
}

export default GameView;