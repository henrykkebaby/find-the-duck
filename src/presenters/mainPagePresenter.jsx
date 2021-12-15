import React,{useState, useEffect} from 'react';
import MainPageView from "../views/mainPageView.jsx";
import quickquack from '../sounds/quickquack.wav';
import HighscoreView from '../views/highscoreView';
import { onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase/firebase-config";

function MainPagePresenter(props) {

    var quack = new Audio (quickquack);

    const [highscore, setHighscore] = useState([]);
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) =>{
      setUser(currentUser);
    })

    useEffect(() => {
        props.model.addObserver(() => { GetData(); });
        GetData();

        return () => {
            props.model.removeObserver(() => { GetData(); });
        };
    }, []);


    const GetData = async ()=>{
        if(props.model.firebaseData === null) { return; }
        const scoreList = props.model.firebaseData;

        let highscore_length = 10;
        let highscore_list = [];
        if(scoreList.length < 10) { highscore_length = scoreList.length; }

        scoreList.sort(compareScore).forEach(function(item) {
            //If we still arent done with the highscore list we run this
            if(highscore_length > 0) { highscore_list.push([item.person, item.score]); highscore_length = highscore_length - 1; }
            //If we found the personal highscore and the highscore list we leave
            if(highscore_length <= 0) { setHighscore([...highscore_list]); return; }
        });
    }

    function compareScore(a,b){
        if(a.score < b.score) {return 1;}
        if(a.score > b.score) {return -1;}
        return 0;
    }

    const duckFactArray = [
        "48% of people would rather fight a horse sized duck than 50 duck sized horses.",
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
                model={props.model} duckFact={duckFact} quack={quack} text = {user? "Play": "Guest"}
            />
            <HighscoreView
                 highscore = {highscore}
            />

        </div>
    )
}

export default MainPagePresenter;