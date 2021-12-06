import React, {useState} from 'react';
import { auth } from "../firebase/firebase-config";
import { collection, getDocs, doc, setDoc } from "firebase/firestore/lite";
import { db } from "../firebase/firebase-config";

function WorldPresenter() {

    const [cursors, setCursors] = useState([]);
    const local = "Henrik";

    const GetData = async ()=>{
        const scoreCol = collection(db, "Positions");
        const scoreSnapshot = await getDocs(scoreCol);
        const scoreList = scoreSnapshot.docs.map(doc=>doc.data());
        console.log(scoreList);

        let localCursors = [];

        scoreList.map((cursor) => {
            if(cursor.person !== local) {
                localCursors.push([cursor.PosX, cursor.PosY, cursor.person]);
            }
        });

        setCursors(localCursors);
    }
  
    const SetData = async (PosX, PosY) =>{
    const person = local;
    const personString = String(person);
    await setDoc(doc(db, "Positions", personString), { 
        person: person,
        PosX: PosX,
        PosY: PosY,
    }).then(() => GetData());
    }


    return (<div>
        <div onMouseMoveCapture={(e) => SetData(e.clientX, e.clientY)} style={{position:"absolute", height:"500px", width:"500px", border:"2px solid black"}} />
        {cursors.map((cursor) => {return <div style={{position:"absolute", top:cursor[0], left:cursor[1], height:"10px", width:"10px", border:"2px solid red"}} />})}
    </div>

    )
}

export default WorldPresenter
