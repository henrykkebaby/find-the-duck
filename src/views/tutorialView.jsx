import React from 'react';
import "../styles.css"
function TutorialView(props) {
    return  <div className = "tutorialContainer">
                <h1 className="tutorialTitle">How to play the game</h1>
                <p>Each game is played in 5 rounds</p>
                <p>In each round, you have 15 seconds to find the duck in the picture</p>
                <p>Each time you click right, you will recieve 300p</p>
                <p>Each time you click wrong, you will lose 100p</p>
                <p>But be fast, by every second passing, you will be losing 5p</p>
                <p>And if the timer runs out, the current round will be over and you will lose an additional 500p!</p>
                <p className= "tutorialGL">Good Luck, lets get quackin!</p>
                <button onClick = {()=> props.back()}>Back!</button>
            </div>
}

export default TutorialView;



