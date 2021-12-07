import React from 'react';

function TimerView(props) {
  return (
    <div style={{display: props.showTimer}}>
      <p style={{position:"absolute", top:"550px", userSelect:"none"}} >TIME {props.seconds}s</p>
    </div>
    
  );
}

export default TimerView;