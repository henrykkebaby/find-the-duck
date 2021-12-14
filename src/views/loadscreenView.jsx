import React from 'react';

function LoadscreenView(props) {
  return (
    <div >
      <div style={{display: props.showVid, position:"absolute", userSelect:"none", backgroundColor:"#1a67ab", height:props.height, width:props.width}}></div>
      <video id="duck321" autoPlay muted onEnded={()=> {props.gameStateHandler(1); }} style={{position:"absolute", top: "0px", userSelect:"none", display: props.showVid, height:props.height, width:props.width}}> <source src= {props.duckLoad} type="video/mp4"/></video>
    </div>
  );
}

export default LoadscreenView;