import React from 'react';
import { Link } from 'react-router-dom';

function GameStatsView(props) {
  return (
    <div >
        <p style={{position:"absolute", top:"690px", userSelect:"none"}} >ROUND {props.round} OF {props.roundMAX}</p>
        <p style={{position:"absolute", top:"720px", userSelect:"none"}} >SCORE {props.score}</p>
        <p style={{position:"absolute", top:"820px", userSelect:"none"}} >PERSONAL HIGHSCORE {props.personalHighscore.toString()}</p>
        
    </div>
    
  );
}

export default GameStatsView;