import React,{useState} from 'react';
import TutorialView from "../views/tutorialView.jsx";

function TutorialPresenter(props) {

    return <TutorialView
                model={props.model}
            />
    
}

export default TutorialPresenter;