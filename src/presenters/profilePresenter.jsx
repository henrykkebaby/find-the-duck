import React, { useState, useEffect } from 'react';
import ProfileView from "../views/profileView";
import { useNavigate } from "react-router-dom";

//Firebase
import { auth } from "../firebase/firebase-config";
import { doc, updateDoc  } from "firebase/firestore/lite";
import { db } from "../firebase/firebase-config";

function ProfilePresenter(props) {

    const navigate = useNavigate();

    const [profilePic, setProfilePic] = useState(null);
    const [profileName, setProfileName] = useState(null);

    const defaultProfilePicture = "https://cdn.discordapp.com/attachments/911317330066292800/918091085165756426/duck.png";
    const alternativeProfilePicture = "https://cdn.discordapp.com/attachments/911317330066292800/918090235823407124/duck2.png";

    useEffect(()=>{
        props.model.addObserver(() => { GetData(); });
        GetData();

        return () => {
            props.model.removeObserver(() => { GetData(); });
        };
    }, []);

    function swap() {
        if(profilePic === defaultProfilePicture)
        {setProfilePic(alternativeProfilePicture); return;}
            
        if(profilePic === alternativeProfilePicture)
        {setProfilePic(defaultProfilePicture); return;}
    }

    const GetData = async ()=>{
        if(props.model.firebaseData === null) { return; }
        if(!auth.currentUser) { navigate('/'); return; };
        const scoreList = props.model.firebaseData;

        scoreList.forEach(function(item) {
            if(item.person === auth.currentUser.email) {
                setProfileName(item.person);
                if(!item.picture) {setProfilePic(defaultProfilePicture)}
                else { setProfilePic(item.picture); }
            }
        });
    }

    const SetData = async () =>{
    
        const person = auth.currentUser.email;
        const personString = String(person);
        const picture = profilePic;

        if(props.model.firebaseData === null) { navigate('/'); return; }
        const scoreList = props.model.firebaseData;

        for (let i = 0; i < scoreList.length; i++) { 
            if(scoreList[i].person === person) { scoreList[i].picture = picture; break; } 
        }
    
        await updateDoc(doc(db, "scores", personString), {
          picture: picture
        });
      }

    return  <ProfileView 
                model={props.model}
                profilePic={profilePic}
                profileName={profileName}
                swap={swap}
                saveChanges={SetData}
            />
        
}

export default ProfilePresenter;