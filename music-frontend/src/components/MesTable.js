import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const MesTable = ({id, user}) => {

    const[conCard, setConCard] = useState([]);

    const firebaseConfig = {
        apiKey: "AIzaSyC3Bg51SA_DrEwfaF4u4rGb7MuSdnSHY9E",
        authDomain: "capstoneproj-music.firebaseapp.com",
        projectId: "capstoneproj-music",
        storageBucket: "capstoneproj-music.appspot.com",
        messagingSenderId: "81179338296",
        appId: "1:81179338296:web:3199ab9d91c91054eaa8cd"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    useEffect(()=>{
    async function fetchDataCon(id) {
        try {
            const doc = await db.collection("Messages").doc(id).get();
            if (doc.exists) {
                const data = doc.data();
                setConCard(data);
                return data;
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.log("Error getting document:", error);
        }
    }

    fetchDataCon(id);
    },[])


    let myName = user.user_Fname + " " + user.user_Lname;
    let cardName;

    if(myName == conCard.from)
        cardName = conCard.to
    else
        cardName = conCard.from



    return (
            <div className="card-body">
                <h5 className="card-title">{cardName}</h5>
            </div>
    )

}

//

export default MesTable;
