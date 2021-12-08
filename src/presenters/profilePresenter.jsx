import React,{useState,useEffect} from 'react';
import ProfileView from "../views/profileView";

//Firebase
import {signOut} from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { collection, getDocs, doc, setDoc, updateDoc  } from "firebase/firestore/lite";
import { db } from "../firebase/firebase-config";
import { onAuthStateChanged} from "firebase/auth"

function ProfilePresenter(props) {

    const [profilePic, setProfilePic] = useState(null);
    const [profileName, setProfileName] = useState(null);

    const defaultProfilePicture = "https://cdn.discordapp.com/attachments/911317330066292800/918091085165756426/duck.png";
    const alternativeProfilePicture = "https://cdn.discordapp.com/attachments/911317330066292800/918090235823407124/duck2.png";

    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) =>{ setUser(currentUser) })

    useEffect(() => {
        GetData();
    }, []);

    function swap() {
        if(profilePic === defaultProfilePicture)
        {setProfilePic(alternativeProfilePicture); return;}
            
        if(profilePic === alternativeProfilePicture)
        {setProfilePic(defaultProfilePicture); return;}
    }

    const GetData = async ()=>{
        const scoreCol = collection(db, "scores");
        const scoreSnapshot = await getDocs(scoreCol);
        const scoreList = scoreSnapshot.docs.map(doc=>doc.data());

        scoreList.map(function(item) {
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

export default ProfilePresenter
