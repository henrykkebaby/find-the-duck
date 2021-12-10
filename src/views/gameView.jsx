import React from 'react';

import { Link } from 'react-router-dom';

function GameView(props) {
  return (
    <div>
        {/* game screen */}
        <img style={{position:"absolute", userSelect:"none"}} height={props.height} width={props.width} src={props.background} onError={props.handleImgError} onClick={() => props.rerender(-100, [false, false])} />
        <img style={{position:"absolute", top:props.posY, left:props.posX, userSelect:"none"}} height={props.duckHeight} width={props.duckWidth} src={props.duckPic} onClick={() => {props.rerender(300, [true, false]);props.quack.play();}}/>

        <p style={{position:"absolute", top:"590px", userSelect:"none"}} >ROUND {props.round} OF {props.roundMAX}</p>
        <p style={{position:"absolute", top:"620px", userSelect:"none"}} >SCORE {props.score}</p>
        <p style={{position:"absolute", top:"720px", userSelect:"none"}} >PERSONAL HIGHSCORE {props.personalHighscore.toString()}</p>
        <p style={{position:"absolute", top:"740px", userSelect:"none"}} >HIGHSCORE {props.highscore.toString()}</p>

        <Link to="/" style={{position:"absolute", top:"700px"}}>
            <button>
                EXIT GAME
            </button>
        </Link>

        {/* end screen */}
        <div style={{display: props.showEnd, position:"absolute", userSelect:"none", backgroundColor:"yellow", height:props.height, width:props.width}}>
            <p style={{fontSize: "50px"}}>QUACK! GAME OVER</p>
            <p>Rounds played {props.roundMAX}</p>
            <p>This round you scored: {props.score.toString()}</p>
            <p>Your personal best: {props.personalHighscore.toString()}</p>
            <button onClick={() =>{props.rerender(0, [true, true]);}}>PLAY AGAIN</button>
            <Link to="/">
                <button>
                    EXIT GAME
                </button>
            </Link>
        </div>
        
        {/* load screen */}
        <div style={{display: props.showVid, position:"absolute", userSelect:"none", backgroundColor:"#1a67ab", height:props.height, width:props.width}}></div>
        <video id="duck321" autoPlay muted onEnded={()=> {props.gameStateHandler(1); }} style={{position:"absolute", top: "0px", userSelect:"none", display: props.showVid, height:props.height, width:props.width}}> <source src= {props.duckLoad} type="video/mp4"/></video>

    </div>
    
  );
}

export default GameView;