import React from 'react';
import { Link } from 'react-router-dom';

function GameStatsView(props) {
  return (
    <div >
         <p style={{position:"absolute", top:"590px", userSelect:"none"}} >ROUND {props.round} OF {props.roundMAX}</p>
        <p style={{position:"absolute", top:"620px", userSelect:"none"}} >SCORE {props.score}</p>
        <p style={{position:"absolute", top:"720px", userSelect:"none"}} >PERSONAL HIGHSCORE {props.personalHighscore.toString()}</p>
        <Link to="/" style={{position:"absolute", top:"700px"}}>
            <button>
                EXIT GAME
            </button>
        </Link>
    </div>
    
  );
}

export default GameStatsView;