import React from 'react';
import "../styles.css";

function HighscoreView(props) {

    return (
        <div>
            <div className="highscore1">
                <span className="highscore2">High</span><span className="highscore3">score</span>
                </div>
         
            <div className="highscorecontainer">
                <table>
                    <thead>
                        <tr className="TrHead">
                            <td>Rank</td>
                            <td>Score</td>
                            <td>Name</td>
                        </tr>
                    </thead>
                    <tbody>
                        {props.highscore.map((object, index)=> {
                            return (
                                <tr key={index}>
                                    <td>{index+1}.</td>
                                    <td>{object[1]}</td>
                                    <td>{object[0]}</td>
                                </tr>
                            ) 
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HighscoreView;



/* 

    return (
        <div className="highscorecontainer">
           <table>
                <thead>
                    <tr className="TrHead">
                        <td>Rank</td>
                        <td>Score</td>
                        <td>Name</td>
                    </tr>
                </thead>
                <tbody>
                 {}
                </tbody>

           </table>
        </div>
    )
}
*/