import React from 'react';

import { Link } from 'react-router-dom';

function GameView(props) {
  return (
    <div>
        {/* game screen */}
        <img style={{position:"absolute", userSelect:"none"}} height={props.height} width={props.width} src={props.background} onError={props.handleImgError} onClick={() => props.rerender(-100, [false, false])} />
        <img style={{position:"absolute", top:props.posY, left:props.posX, userSelect:"none"}} height={props.duckHeight} width={props.duckWidth} src={props.duckPic} onClick={() => {props.rerender(300, [true, false]);props.quack.play();}}/>

        {/*highscoreView <p style={{position:"absolute", top:"740px", userSelect:"none"}} >HIGHSCORE {props.highscore.toString()}</p>*/}
        
    </div>
    
  );
}

export default GameView;