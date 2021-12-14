import React from 'react';
import TutorialView from "../views/tutorialView.jsx";
import { useNavigate } from "react-router-dom";

function TutorialPresenter(props) {

    const navigate = useNavigate();
    function back(){ navigate('/'); }
    
    return <TutorialView
                model={props.model}
                back = {back}
            />
    
}

export default TutorialPresenter;