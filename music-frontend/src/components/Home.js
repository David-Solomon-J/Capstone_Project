import NavBar from './NavBar'
import NavBarAdm from './NavBarAdm'
import '../styles/styles.css'
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import EditIcon from '@mui/icons-material/Edit';
import ReviewsIcon from "@mui/icons-material/Reviews";
import AddIcon from '@mui/icons-material/Add';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DeleteIcon from '@mui/icons-material/Delete';
import "firebase/compat/auth";

function Home() {

    const context = useContext(AuthContext)
    const[plylist, setPlylist] = useState([])
    const[coPlaylist, setCoPlaylist] = useState([]);
    const [counter, setCounter] = useState(0);
    const [inputValue, setInputValue] = useState("");

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

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    const userRef = db.collection("User")

    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem("user"));
        //let user = context.currentUser;
        //let obj = JSON.stringify(user);
        //localStorage.setItem("user", obj);
        context.getInfo(user.uid);

    },[])

    const [isOpen, setIsOpen] = useState(false);

    async function HandleClick(event) {
        setIsOpen(true);
    }

    async function HandleSubmit(event) {
        let name = document.getElementById('nameInput').value;
        //console.log(context.currentUser.user_id);
        context.changeName(context.currentUser.uid, name);
        setIsOpen(false);
    }

    useEffect(() => {
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

    const getPlaylist = async (token) => {

        const plyListURL = 'https://api.spotify.com/v1/browse/featured-playlists?limit=20';
        const result = await fetch(plyListURL, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        })
            .then(res => res.json())
            //.then(data => console.log(data.playlists.items[0].images[0].url))
            .then(data => {
                //useEffect((x) => {
                    setPlylist(data.playlists.items)
                //}, []);
            });
        //data.playlists.items

    }



    let assignTK = (x) => {
        tk = x;

        getPlaylist(tk);

        //getTracks(x);
        return tk;
    }


    getToken();

    },[])

    //console.log(plylist);

    useEffect(() => {
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
    const commPlaylistRef = db.collection("Playlist")
    let songs = [];

    let plyst = commPlaylistRef.get().then(
        async res => {
            res.forEach(doc => {

                res = doc.data();


                if(res.isPublic == true){

                    songs.push(res);

                }

                //console.log(songs);
                setCoPlaylist(songs);

            });

        }
    )
    },[])


    function addPlaylist(res){

        userRef.doc(user.uid).update({
            gen_pylists: firebase.firestore.FieldValue.arrayUnion(res.id)
        }).then(r => {
            console.log("added");
        })

        alert("Playlist has been added from your personal catalog");
        setTimeout(function() {
            window.location.href = window.location.href;
        }, 3000);

    }

    function removePlaylist(res){

        userRef.doc(user.uid).update({
            gen_pylists: firebase.firestore.FieldValue.arrayRemove(res.id)
        }).then(r => {
            console.log("Removed");
        })

        alert("Playlist has been removed from your personal catalog");
        setTimeout(function() {
            window.location.href = window.location.href;
        }, 3000);
    }

    function checkIfUserHas(x){
        let checker = false;

        if(user.gen_pylists != undefined) {
            for (let i = 0; i < user.gen_pylists.length; ++i) {
                if (x == user.gen_pylists[i]) {
                    checker = true;
                }
            }
        }

        return checker;

    }

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

    function ratePlaylist(res, num){

        const rating = document.querySelector('#rating');
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        const makePublicRef = db.collection("Playlist")



        if((rating.value > 5 || rating.value < 0) || num === "")
            alert("Please enter proper value")
        else {

            console.log(rating.value)

            let x = parseInt(num);
            let y = parseInt(res.rating);

            console.log(typeof x);  // outputs "number"
            console.log(typeof y);  // outputs "string"

            let newRate = (x + y)/2;

            makePublicRef.doc(res.id).update({
                rating: newRate
            }).then();

            alert("Thanks for rating!")
            setTimeout(function() {
                window.location.href = window.location.href;
            }, 3000);

            // console.log(newRate + " + " + x + " + " + y + " + /2" )


        }

    }

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }


    function delAct(){
        let user = firebase.auth().currentUser;

        userRef.doc(user.uid).delete()
            .then(() => {

            })
            .catch((error) => {

            });

        user.delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

        window.location.href = '/';

    }

        return (
            <>
                <div className="wrapper" id="wrapper">
                    {
                        context.currentUser.isAdmin ? <NavBarAdm />:<NavBar />
                    }

                    <div className="container" id="homeBdy">

                        <h1>Home</h1>

                        <div className="container bootstrap snippets bootdey">
                            <div className="panel-body inf-content">
                                <div className="row">
                                    <div className="col-md-8 mt-2 m-lg-5">
                                        <strong>Information</strong><br/>
                                        <div className="table-responsive">
                                            <table className="table table-user-information">
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <strong>

                                                            <span
                                                                className="glyphicon glyphicon-asterisk text-primary"></span>
                                                            First Name
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">
                                                        {context.currentUser.user_Fname}
                                                    </td>
                                                    <td>
                                                        <div className="button" onClick={HandleClick}>
                                                            <EditIcon/>
                                                            {
                                                                isOpen ?
                                                                    <form className="mx-1 mx-md-4" >
                                                                    <input type="text" className="form-control" placeholder="New Name"
                                                                           aria-label="Username" aria-describedby="basic-addon2"
                                                                           id="nameInput"/>
                                                                    <button type="button" className="btn btn-primary btn-sm" onClick={HandleSubmit}>Update</button>
                                                                    </form>
                                                                    : ""
                                                            }

                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            <span
                                                                className="glyphicon glyphicon-user  text-primary"></span>
                                                            Last Name
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">
                                                        {context.currentUser.user_Lname}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            <span
                                                                className="glyphicon glyphicon-cloud text-primary"></span>
                                                            Email
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">
                                                        {context.currentUser.user_email}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        <strong>
                                                            <span
                                                                className="glyphicon glyphicon-bookmark text-primary"></span>
                                                            ID
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">
                                                        {context.currentUser.uid}
                                                    </td>
                                                </tr>


                                                <tr>
                                                    <td>
                                                        <strong>
                                                            <span
                                                                className="glyphicon glyphicon-eye-open text-primary"></span>
                                                            Is Admin
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">
                                                        {
                                                            context.currentUser.isAdmin ? "True":"False"
                                                        }
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <button id="delAct" onClick={() => delAct()}>
                                        <DeleteIcon/>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="containerPlylist">
                            <div className="row m-lg-2">
                                {
                                    plylist != undefined ? plylist.map((playlist)=>{
                                        //Button to add playlist ID to DB
                                        let iurl = ""
                                        if(playlist.images)
                                            iurl = playlist.images[0].url;
                                        return(
                                            <div className="col-md-4 mb-3">
                                                <div className="card h-100 position-relative">
                                                    <img className="card-img-top mx-auto pt-1" src={iurl} className="card-img-top book-img mx-auto pt-1" alt='' />
                                                    <div className="card-body book-card-details" >
                                                        <h5 className="card-title on-list">{playlist.name}</h5>
                                                        <h7 className="card-title text-muted">Description: {playlist.description}</h7>
                                                        <h6 className="card-subtitle mb-2">{}</h6>
                                                        <p className="card-text">{}</p>

                                                        <div className="rate">
                                                            <input type="radio" id="star5" name="rate" value="5"/>
                                                            <label htmlFor="star5" title="text">5 stars</label>
                                                            <input type="radio" id="star4" name="rate" value="4"/>
                                                            <label htmlFor="star4" title="text">4 stars</label>
                                                            <input type="radio" id="star3" name="rate" value="3"/>
                                                            <label htmlFor="star3" title="text">3 stars</label>
                                                            <input type="radio" id="star2" name="rate" value="2"/>
                                                            <label htmlFor="star2" title="text">2 stars</label>
                                                            <input type="radio" id="star1" name="rate" value="1"/>
                                                            <label htmlFor="star1" title="text">1 star</label>
                                                        </div>

                                                    </div>
                                                    <br/>

                                                    <br/>
                                                    <button className="btn btn-light">Save playlist</button>

                                                </div>
                                            </div>
                                        )

                                    }):""

                                }
                            </div>
                        </div>

                        <div>
                            <h2>Community Playlist</h2>

                            <div className="row">
                                {
                                    coPlaylist.length > 0 ? coPlaylist.map((res)=>{

                                            //console.log(res.id);
                                            let userHasPly = false;

                                            userHasPly = checkIfUserHas(res.id);

                                            // console.log(userHasPly)

                                            let ctr = 0;
                                            // let commLength;
                                            //
                                            //
                                            // if(typeof(res.comments) !== undefined)
                                            //     console.log(res.comments)
                                            // else
                                            //     console.log(0);



                                            function nxtComment(x){
                                                if(counter < x-1)
                                                    setCounter(counter + 1)
                                                else
                                                    setCounter(0)

                                                ctr = counter
                                            }

                                            // console.log(res.comments == undefined)
                                            return(
                                                <div className="col-sm-6">
                                                    <div className="card m-3">
                                                        <h5 className="card-title m-3">{res.name}</h5>
                                                        <div className="card-text m-4">Description: {res.description}</div>
                                                        <div className="m-1">

                                                            <div className="commentSec">
                                                                <div className="card-text m-lg-3 mt-0">Comments
                                                                    <button id="commentNxtBtn" onClick={() => nxtComment(res.comments.length)}>
                                                                        <NavigateNextIcon/>
                                                                    </button>
                                                                    <button id="commentBtnHome" onClick={() => addComment(res)}>
                                                                        <ReviewsIcon/>
                                                                    </button>
                                                                </div>
                                                                <div className="card-text m-4">- {
                                                                    res.comments == undefined ? "":res.comments[counter]
                                                                } </div>

                                                            </div>

                                                        </div>

                                                        <div className="card-text m-lg-3 mt-0">Rating (0-5)
                                                            <input className="m-3" type="number" id="rating"
                                                                   name="rating" min="0" max="5" text="muted"
                                                                   pattern="[0-5]*" onChange={handleInputChange}></input>
                                                            <button id="rateBtn"
                                                                    onClick={() => ratePlaylist(res, inputValue)}>Rate
                                                            </button>

                                                            <div className="card-text m-4"> Playlist
                                                                Rating: {res.rating} </div>

                                                        </div>

                                                        <div className="card-footer m-1">
                                                            {
                                                                userHasPly ?
                                                                    (<button id="addBtn" onClick={() => removePlaylist(res)}>
                                                                        <CloseIcon/>
                                                                    </button>)
                                                                    :
                                                                    (<button id="addBtn" onClick={() => addPlaylist(res)}>
                                                                        <AddIcon/>
                                                                    </button>)
                                                            }
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

                </div>
            </>
        );
}

export default Home;
