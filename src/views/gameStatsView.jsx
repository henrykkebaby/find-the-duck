import React from 'react';

function GameStatsView(props) {
  return (
    <div>
      <div className="gameStat">
      <p style={{position:"absolute", top:"690px", userSelect:"none"}} >ROUND {props.round} OF {props.roundMAX}</p>
      <p style={{position:"absolute", top:"720px", userSelect:"none"}} >SCORE {props.score}</p>
      <p style={{position:"absolute", top:"780px", userSelect:"none"}} >PERSONAL HIGHSCORE {props.personalHighscore.toString()}</p>
      </div>
    </div>
  );
}

export default GameStatsView;