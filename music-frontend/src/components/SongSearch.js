import NavBar from './NavBar'
import '../styles/songSearch.scss'
import React, {Component} from 'react';
import AddIcon from '@mui/icons-material/Add';
import NavBarAdm from "./NavBarAdm";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


class SongSearch extends Component{
    constructor(props) {
        super(props);
        this.state = {songs: [], tk: "", isListVisible: false, plylists: []}
        this.handelClick = this.handelClick.bind(this);
        this.addSong = this.addSong.bind(this);

    }


    async componentDidMount() {

        let client_id = "4bcd6ab963f844cd984df774aac47791";
        let client_secret = "9c1f076f76c145b4a221386761209322";
        let key = '';
        let num = '';


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
            this.setState({tk: x})
            console.log(this.state.tk);

            //getTracks(x);
            return num;
        }


        getToken();


        let user = JSON.parse(localStorage.getItem("user"));

        const firebaseConfig = {
            apiKey: "AIzaSyC3Bg51SA_DrEwfaF4u4rGb7MuSdnSHY9E",
            authDomain: "capstoneproj-music.firebaseapp.com",
            projectId: "capstoneproj-music",
            storageBucket: "capstoneproj-music.appspot.com",
            messagingSenderId: "81179338296",
            appId: "1:81179338296:web:3199ab9d91c91054eaa8cd"
        };

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
                    //console.log(data.name);
                    list.push(data);
                } else {
                    //console.log("No such document!");
                }
            });
        }

        console.log(list)

        this.setState({plylists: list})


    }

    handelClick(qInput){
        console.log("hello")

        //let qInput = 'Duckwrth';
        let tInput = 'track';
        let gInput = 'Rap';

        const getTrack = async () => {

            const plyListURL = 'https://api.spotify.com/v1/search?query=' + qInput + '&type=' + tInput + '&genre=' + gInput + "&limit=30";
            const resultSongs = await fetch(plyListURL, {
                    method: 'GET',
                    headers: {'Authorization': 'Bearer ' + this.state.tk}
                })
                    .then(res => {
                        return res.json()
                    })
                .then(res => {
                    console.log(res)
                    this.setState({songs: res.tracks.items})
                })

        }
        getTrack();
    }

    handelClickY(qInput, yInput){
        console.log("hello")

        //let qInput = 'Duckwrth';
        let tInput = 'track';
        let gInput = 'Rap';

        const getTrack = async () => {

            const plyListURL = 'https://api.spotify.com/v1/search?query=' + qInput +'&year=' + yInput + '&type=' + tInput + "&limit=30";
            const resultSongs = await fetch(plyListURL, {
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + this.state.tk}
            })
                .then(res => {
                    return res.json()
                })
                .then(res => {
                    console.log(res)
                    this.setState({songs: res.tracks.items})
                })

        }
        getTrack();
    }

    addSong(res){
        console.log(res.id)
        if(this.state.isListVisible == false)
            this.setState({isListVisible: true})
        else
            this.setState({isListVisible: false})
    }

    selSong(pyId, songId){
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
        db.collection("Playlist").doc(pyId).update({
            songs: firebase.firestore.FieldValue.arrayUnion(songId)
        }).then(r => {
            alert("Song has been added to playlist")
        })
        setTimeout(function() {
            window.location.href = window.location.href;
        }, 3000);
    }



    render(){

        console.log(this.state.plylists)
        let user = JSON.parse(localStorage.getItem("user"));


    return(

        <>
            <div className="wrapper" id="wrapper">
                {
                    user.isAdmin ? <NavBarAdm />:<NavBar />
                }
                    <div className="container" id="bdy">

                        <h1>Search: <h5>Use the provided filters to find a track of your prefernce</h5></h1>
                        <div className="cardContainer d-flex justify-content-center">
                                <div className="row row-cols-3">
                                {
                                    this.state.songs.length > 0 ? this.state.songs.map((song, i)=>{

                                        let img = song.album.images[0].url;
                                        let audioUrl = song.preview_url;
                                        // console.log(img);

                                        return(
                                            // <h3>Songs: {res.name}</h3>
                                            <div key={i} className="col">
                                                <div className="card w-60 mb-3 ms-3">
                                                    <img src={img}
                                                         className="card-img-top"
                                                         alt="Hollywood Sign on The Hill"/>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{song.name}</h5>
                                                        <p className="card-text">
                                                            <b>Artist Name</b>: {song.artists[0].name} <br/>
                                                            <b>Album Name</b>: {song.album.name}
                                                        </p>
                                                    </div>
                                                    <div className="card-footer d-flex justify-content-center" id="cardFoot">
                                                            <audio
                                                                controls
                                                                src={audioUrl}>
                                                            </audio>
                                                     <button id="addBtn" onClick={() => this.addSong(song)}>
                                                        <AddIcon/>
                                                    </button>

                                                    </div>
                                                    <div>
                                                        <ul>
                                                        {this.state.isListVisible && (

                                                            this.state.plylists != undefined ? this.state.plylists.map(r => {
                                                                //console.log(r)
                                                                return (
                                                                    <button id="plyChoiceBtn" onClick={() => this.selSong(r.id, song.id)}>
                                                                        <li>{r.name}</li>
                                                                    </button>
                                                                )
                                                            }):""

                                                        )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                        )

                                    })
                                        :
                                        ""
                                }
                            <br/>
                            </div>
                        </div>
                    </div>



                <div className="searchContainer" id="searchContainer">
                    <div className="row mb-3">
                        <div className="col d-flex align-content-center">
                            <button className="btn btn-secondary btn-large" onClick={() => this.handelClick("Kendrick")}>
                                Kendrick Lamar
                            </button>
                        </div>

                        <div className="col d-flex align-content-center">
                            <button className="btn btn-secondary btn-large" onClick={() => this.handelClick("Drake")}>
                                Drizzy
                            </button>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <button className="btn btn-secondary btn-large" onClick={() => this.handelClick("J.cole")}>
                                Cole World
                            </button>
                        </div>

                        <div className="col">
                            <button className="btn btn-secondary btn-large" onClick={() => this.handelClick("Kodak")}>
                                Kodak Moment
                            </button>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <button className="btn btn-secondary btn-large" onClick={() => this.handelClick("John Legend")}>
                                John the legend
                            </button>
                        </div>
                        <div className="col d-flex align-content-center">
                            <button className="btn btn-secondary btn-large" onClick={() => this.handelClick("Tupac")}>
                                2 Pac
                            </button>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col d-flex align-content-center">
                            <button className="btn btn-secondary btn-large" onClick={() => this.handelClick("Lauryn hill")}>
                                Ms. Hill
                            </button>
                        </div>
                        <div className="col d-flex align-content-center">
                            <button className="btn btn-secondary btn-large" onClick={() => this.handelClick("songs", "2010")}>
                                2010 Hits
                            </button>
                        </div>

                    <div className="col d-flex align-content-center">
                        <button className="btn btn-secondary btn-large" onClick={() => this.handelClick("tracks", "1990")}>
                            Oldies
                        </button>
                    </div>
                </div>
            </div>
            </div>

            {/*</div>*/}
        </>
        )
    }
}


export default SongSearch;
