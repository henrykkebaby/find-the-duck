import React from 'react';
import "../styles.css";


function HighscoreView(props) {

   

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
                    {props.highscore.map((object, index)=> {
                         return(
                            <tr>
                            <td>{index+1}.</td>
                            <td>{object[1]}</td>
                            <td>{object[0]}</td>
                        </tr>
                         )
                         
                    })}
                   
                </tbody>

           </table>
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