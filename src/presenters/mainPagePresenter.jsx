import React,{useState} from 'react';
import MainPageView from "../views/mainPageView.jsx";

function MainPagePresenter(props) {

    const duckFactArray = [
        "48% of people would rather fight a horse sized duck then 50 duck sized horses.",
        "A male duck is called a drake, and they started from the bottom now they here.",
        "Ducks can sleep with one eyed open to avoid being sneaked up upon.",
        "The highest flying duck was a mallard at 6400 meters.",
        "City ducks have different accents from country ducks.",
        "The most famous duck is donald duck.",
        "Ducks can swim, fly and walk, but they aren't great at any of them.",  
        "You are not allowed to dye ducks on sundays in many parts of the US.",
        "A debug duck is a duck you talk to about your code to easier articulate your problem!",
        "The first rubber ducks are traced back to the 1800s."
    ]
    const duckFact = duckFactArray[Math.floor(Math.random()*duckFactArray.length)];

    return (
        <div>
            <MainPageView
                model={props.model} duckFact={duckFact}
            />
        </div>
    )
}

export default MainPagePresenter;