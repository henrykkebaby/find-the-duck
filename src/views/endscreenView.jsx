import React from 'react';
import "../styles.css";

function EndscreenView(props) {
    return (
        <div style={{ display: props.showEnd, position:"absolute", userSelect:"none", backgroundColor:"yellow", height:props.height, width:props.width}}>
            <p id = "endscreenText">QUACK! GAME OVER</p>
            <p>Rounds played {props.roundMAX}</p>
            <p>This round you scored: {props.score.toString()}</p>
            <p>Your personal best: {props.personalHighscore.toString()}</p>
            <button onClick={() =>{props.rerender(0, [true, true]);}}>PLAY AGAIN</button>
        </div>
    );
}

export default EndscreenView;

