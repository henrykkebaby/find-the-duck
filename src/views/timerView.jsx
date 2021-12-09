import React from 'react';

function TimerView(props) {
  return (
    <div >
      <p style={{position:"absolute", top:"650px", userSelect:"none"}} >TIME {props.seconds}s</p>
    </div>
    
  );
}

export default TimerView;