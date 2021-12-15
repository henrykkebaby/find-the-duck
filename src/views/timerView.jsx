import React from 'react';
import "../styles.css"

function TimerView(props) {
  return (
    <div >
      <p className = "timerText" >TIME {props.seconds}s</p>
    </div>
    
  );
}

export default TimerView;