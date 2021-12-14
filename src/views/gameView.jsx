import React from 'react';

function GameView(props) {
  return (
    <div>
        <img id="duckspace" style={{position:"absolute", userSelect:"none"}} height={props.height} width={props.width} src={props.background} onError={props.handleImgError} onClick={() => props.rerender(-100, [false, false])} />
        <img style={{ display: props.showDuck, position:"absolute", top:props.posY, left:props.posX, userSelect:"none"}} height={props.duckHeight} width={props.duckWidth} src={props.duckPic} onClick={() => {props.rerender(300, [true, false]);props.quack.play();}} />  
    </div>
  );
}

export default GameView;