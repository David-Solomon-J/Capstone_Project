import NavBar from './NavBar'
import React, { Component, useState } from 'react';
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import NavBarAdm from './NavBarAdm'
import ReviewsIcon from '@mui/icons-material/Reviews';
import PublicIcon from '@mui/icons-material/Public';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const MyPlyst = () => {

    const context = useContext(AuthContext);
    const [plylists, setPlylists] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [counter, setCounter] = useState(0);

    let tk = "";
    let user = JSON.parse(localStorage.getItem("user"));

    let client_id = "4bcd6ab963f844cd984df774aac47791";
    let client_secret = "9c1f076f76c145b4a221386761209322";

    const firebaseConfig = {
        apiKey: "AIzaSyC3Bg51SA_DrEwfaF4u4rGb7MuSdnSHY9E",
        authDomain: "capstoneproj-music.firebaseapp.com",
        projectId: "capstoneproj-music",
        storageBucket: "capstoneproj-music.appspot.com",
        messagingSenderId: "81179338296",
        appId: "1:81179338296:web:3199ab9d91c91054eaa8cd"
    };

    useEffect(() => {
        async function fetchPlaylists() {
            // Creates connection to firebase

            firebase.initializeApp(firebaseConfig);
            const db = firebase.firestore();
            const genPylistRef = db.collection("Playlist");
            const list = [];

            for (let i = 0; i < user.gen_pylists.length; ++i) {
                await genPylistRef.doc(user.gen_pylists[i]).get().then((doc) => {
                    if (doc.exists) {
                        // extract data from the snapshot
                        const data = doc.data();
                        console.log(data.name);
                        list.push(data);
                    } else {
                        console.log("No such document!");
                    }
                });
            }
            console.log("list", list)
            setPlylists(list);
        }

        fetchPlaylists();
    }, []);

    useEffect(() => {
        console.log(plylists);
    }, [plylists]);


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

        let userName = user.user_Fname + " " + user.user_Lname;

        context.createPlaylist(playlistName,playlistDescription, user.uid, userName);
    }



    console.log(user);


    function addComment(res){
        let input = window.prompt("Please enter your comment:", "John Doe");

        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        db.collection("Playlist").doc(res.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion(input)
        }).then(r => {
            console.log("Comment added");
        })
        setTimeout(function() {
            window.location.href = window.location.href;
        }, 3000);
    }



    function addPublic(res){
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        const makePublicRef = db.collection("Playlist")

        if(res.isPublic == false) {
            makePublicRef.doc(res.id).update({
                isPublic: true
            });
            alert("This is now a Community playlist, Thanks for sharing!")
            setTimeout(function() {
                window.location.href = window.location.href;
            }, 3000);
        }
        else{
            makePublicRef.doc(res.id).update({
                isPublic: false
            });
            alert("Playlist has been removed from community")
            setTimeout(function() {
                window.location.href = window.location.href;
            }, 3000);
        }

        console.log(res.isPublic)

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
                    <p>Created By: {user.user_Fname} {user.user_Lname}</p>
                    <p>Playlist Description: {playlistDescription}</p>

                    <h1>Your Playlist</h1>

                    <div className="row">
                    {
                        plylists.length > 0 ? plylists.map((res)=>{

                            // console.log(res.id);

                            let ctr = 0;

                                function nxtComment(x){
                                    if(counter < x-1)
                                        setCounter(counter + 1)
                                    else
                                        setCounter(0)

                                    ctr = counter
                                }

                                return(
                                    <div className="col-sm-6">
                                        <div className="card m-3">
                                            <h4 className="card-title m-3">{res.name}</h4>
                                            <div className="card-text m-4">Description: {res.description}</div>
                                            <div className="m-1">

                                                <div className="commentSec">
                                                    <div className="card-text m-lg-3 mt-0">Comments
                                                        <button id="commentNxtBtn" onClick={() => nxtComment(res.comments.length)}>
                                                            <NavigateNextIcon/>
                                                        </button>
                                                    </div>
                                                    <div className="card-text m-4">- {
                                                        res.comments == undefined ? "":res.comments[counter]
                                                    } </div>

                                                </div>
                                            </div>
                                            <div className="card-footer m-1">
                                                {
                                                    res.isPublic ?
                                                        (<button id="isPublicBtnT" onClick={() => addPublic(res)}>
                                                            <PublicIcon/>
                                                        </button>)
                                                        :
                                                        (<button id="isPublicBtnF" onClick={() => addPublic(res)}>
                                                            <PublicIcon/>
                                                        </button>)
                                                }

                                                <button id="commentBtn" onClick={() => addComment(res)}>
                                                    <ReviewsIcon/>
                                                </button>

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
