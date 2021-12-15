import React from 'react';
import "../styles.css"
import howto from '../localfiles/howto.mp4';
function TutorialView(props) {
    return  <div className = "tutorialContainer">
                {howto?
                <video id="howto" autoPlay muted className="tutorialVideo"> <source src= {howto} type="video/mp4"/> </video>
                :
                <img src ="http://www.csc.kth.se/~cristi/loading.gif"  alt="spinner"/>
                }
                <h1 className="tutorialTitle">How to play the game (Text-edition)</h1>
                <p>Each game is played in 5 rounds</p>
                <p>In each round, you have 15 seconds to find the duck in the picture</p>
                <p>Each time you click right, you will recieve 300p</p>
                <p>Each time you click wrong, you will lose 100p</p>
                <p>But be fast, by every second passing, you will be losing 5p</p>
                <p>And if the timer runs out, the current round will be over and you will lose an additional 500p!</p>
                <p className= "tutorialGL">Good Luck, lets get quackin!</p>
                <button className="tutorialBtn" onClick = {()=> props.back()}>Back!</button>
            </div>
}

export default TutorialView;



