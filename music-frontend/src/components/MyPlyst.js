import NavBar from './NavBar'
import '../styles/myPlystStyles.css'
import React, { Component, useState } from 'react';
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import NavBarAdm from './NavBarAdm'
import ReviewsIcon from '@mui/icons-material/Reviews';

const MyPlyst = () => {

    const context = useContext(AuthContext);
    const [plylists, setPlylists] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    let tk = "";
    let user = JSON.parse(localStorage.getItem("user"));
    let displayPylist = [];


    let client_id = "4bcd6ab963f844cd984df774aac47791";
    let client_secret = "9c1f076f76c145b4a221386761209322";


    useEffect(() => {
        //Creates connection to firebase
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
        const genPylistRef = db.collection("Playlist")

        for (let i = 0; i < user.gen_pylists.length; ++i) {

            //console.log(user.gen_pylists[i]);
            if (user.gen_pylists.length == 0) {
                console.log("No plylist")
            } else {
                genPylistRef.doc(user.gen_pylists[i]).get().then((doc) => {
                    if (doc.exists) {

                        // extract data from the snapshot
                        const data = doc.data();
                        console.log(data);
                        displayPylist.push(data);

                        console.log(plylists)

                        setPlylists(plylists => [...plylists, data]);


                    } else {
                        console.log("No such document!");
                    }

                });
            }
        }


    },[])

    let tracker = 0;

    if(tracker == 0) {
        for (let i = 0; i < plylists.length; ++i) {

            for (let j = 1; j < plylists.length; ++j) {

                if (plylists[i].name == plylists[j].name) {
                    plylists.splice(j, 1);
                }

            }

        }
        ++tracker;
    }

    //Async Function (Post method) to get API key
    const getToken = async () => {
        //Fetch using spotify base URL and headers containing client id & secret
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
            },
            body: 'grant_type=client_credentials'
        })
            //Then response with assign function to access variable in promise
            .then(res => res.json())
            .then(data => assignTK(data.access_token))
        //.then(() => console.log(num));

    }

    let assignTK = (x) => {
        //setTk(x)
        tk = x;
        //console.log(tk);

        //getTracks(x);
        return tk;
    }
    getToken();


    function HandleClick() {
        // Get the playlist name input field
        const playlistNameInput = document.querySelector('#playlistNameInput');
        const playlistDescriptionInput = document.querySelector('#playlistDescriptionInput');
        // Get the playlist name from the input field
        const playlistName = playlistNameInput.value;
        const playlistDescription = playlistDescriptionInput.value;

        // Store the playlist name and description in the component's state
        setPlaylistName(playlistName);
        setPlaylistDescription(playlistDescription);

        console.log(user.uid)

        context.createPlaylist(playlistName,playlistDescription, user.uid);
    }


    console.log(user);


    function addComment(){
        alert("Add Comment");
    }

    return (

        <>
            <div className="wrapper" id="wrapper">
                {
                    user.isAdmin ? <NavBarAdm />:<NavBar />
                }
                <div className="container" id="bdy">
                    <h1>Create your playlist</h1>
                    <label htmlFor="playlistNameInput">Playlist Name:</label>
                    <input type="text" id="playlistNameInput" name="playlistNameInput"></input>
                    <br/>
                    <label htmlFor="playlistDescriptionInput">Playlist Description:</label>
                    <textarea id="playlistDescriptionInput" name="playlistDescriptionInput"></textarea>
                    <br/>
                    <button type="button" id="createButton" onClick={HandleClick}>Create Playlist</button>

                    <br/>
                    <br/>
                    <br/>
                    <h4>Playlist Name: {playlistName}</h4>
                    <p>User: {user.uid}</p>
                    <p>Playlist Description: {playlistDescription}</p>

                    <h1>Your Playlist</h1>

                    <div className="row">
                    {
                        plylists.length > 0 ? plylists.map((res)=>{

                                return(
                                    <div className="col-sm-6">
                                        <div className="card m-3">
                                            <h5 className="card-title m-3">{res.name}</h5>
                                            <div className="card-text m-4">Description: {res.description}</div>

                                            <div className="card-footer m-1">
                                                <button onClick={() => addComment()}>
                                                    <ReviewsIcon/>
                                                </button>
                                                {/*{*/}
                                                {/*    isOpen ? <input type="text"/>:""*/}
                                                {/*}*/}
                                            </div>
                                        </div>
                                    </div>

                                )

                            })
                            :
                            ""
                    }
                    </div>

                </div>

            </div>
        </>
    );
}


export default MyPlyst;
