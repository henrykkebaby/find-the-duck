import React from 'react';

function TimerView(props) {
  return (
    <div>
      <p style={{position:"absolute", top:"550px", userSelect:"none"}} >TIME {props.seconds}s</p>
    </div>
    
  );
}

export default TimerView;