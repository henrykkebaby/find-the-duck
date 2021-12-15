import React from 'react';
import "../styles.css"
function GameStatsView(props) {
  return (
    <div>
      <div className="gameStat">
      <p id = "roundText">ROUND {props.round} OF {props.roundMAX}</p>
      <p id = "scoreText">SCORE {props.score}</p>
      <p id = "personalText" >PERSONAL HIGHSCORE {props.personalHighscore.toString()}</p>
      </div>
    </div>
  );
}

export default GameStatsView;