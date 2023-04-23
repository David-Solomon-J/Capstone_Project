import NavBar from './NavBar'
import NavBarAdm from './NavBarAdm'
import '../styles/styles.css'
import React, {Component} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';



class Reports extends Component {
    //Creates all needed state variables
    constructor(props) {
        super(props);
        this.state = {playlistList: [], tk: "", songs: [],songCounter: (0),songCounter2: (0), search_Counter: (0), search_value: "Search by artist..", list: [] }

        this.onClick = this.onClick.bind(this)
        this.myFunction = this.myFunction.bind(this)
        this.searchFldButton = this.searchFldButton.bind(this)
    }

    componentDidMount() {

        //Declares variable needed for getToken request
        let client_id = "4bcd6ab963f844cd984df774aac47791";
        let client_secret = "9c1f076f76c145b4a221386761209322";

        //API call to spotify to get access token
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

        //Assigns asscess tk to the state variable "tk"
        let assignTK = (x) => {
            this.setState({tk: x})
        }

        getToken();



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

                        songs.push(res);

                        //console.log(songs);
                        this.setState({list: songs});

                    });

                }
            )


    }

    //Button to get all song in firebase
    async onClick() {

        //Creates connection to firebase
        let plylstList = [];
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

        //Finds and stores the all the plylist id's in Firebase
        const DocumentReference = db.collection("User");

        let plyst = DocumentReference.get().then(
            async res => {
                res.forEach(doc => {
                    //console.log(doc.id, '=>', doc.data());
                    //console.log(doc.data())

                    if (doc.data().user_plyst != undefined) {
                        let size = doc.data().user_plyst.length

                        for (let i = 0; i < size; ++i) {
                            //console.log(doc.data().user_plyst[0])
                            plylstList.push(doc.data().user_plyst[i]);

                        }

                    }

                });

                await this.setState({playlistList: plylstList})
            }
        )

        let token = this.state.tk;
        let mySongs = [];

        //Loopd through all plylist and extracts information using the various stord id's
        for (let elm in this.state.playlistList) {

            const getPlaylist = async (token) => {


                const plyListURL = 'https://api.spotify.com/v1/playlists/' + this.state.playlistList[elm] + '/tracks';
                const result = await fetch(plyListURL, {
                    method: 'GET',
                    headers: {'Authorization': 'Bearer ' + token}
                })
                    .then(res => res.json())
                    .then(data => {
                        //console.log(data.items);

                        for (let i = 0; i < data.items.length; ++i) {
                            let genre;
                            let nameTrack = data.items[i].track.name;
                            let nameAlbum = data.items[i].track.album.name;
                            let trackId = data.items[i].track.id;
                            let nameArtist = data.items[i].track.artists[0].name;
                            let dropDate = data.items[i].track.album.release_date;
                            let audioUrl = data.items[i].track.preview_url;

                            //mySongs.push(data.items[i].track);
                            //console.log(data.items[i].track)

                            // console.log(data.items[i].track)
                            const getTracks = async (token) => {

                                const plyListURL = 'https://api.spotify.com/v1/artists/' + data.items[i].track.artists[0].id;
                                const result = await fetch(plyListURL, {
                                    method: 'GET',
                                    headers: {'Authorization': 'Bearer ' + token}
                                })
                                    .then(res => res.json())
                                    .then(data => {

                                        genre = data.genres[0];


                                    });


                                //mySongs Object that get stored
                                mySongs.push({
                                    name: nameTrack,
                                    album: nameAlbum,
                                    genres: genre,
                                    id: trackId,
                                    release_date: dropDate,
                                    artist: nameArtist,
                                    preview_url: audioUrl,

                                });

                            }


                            getTracks(token);

                        }

                    });

            }

            await getPlaylist(token);

        }


        this.setState({songs: mySongs});
        console.log(this.state.songs)

    }



    //Functionallity for alternating search param
    searchFldButton(){

        let options = ["", "Search by genres...", "Search by artist..."];

        this.setState({search_Counter: ++this.state.search_Counter})
        this.setState({search_value: options[this.state.search_Counter]})

        if(this.state.search_Counter > 1){
            this.setState({search_Counter: 0})
        }


    }


    //Filters and updates table according to query
    myFunction() {

        // Declare variables
        let input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        let counter = 0;

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    ++counter;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }

        console.log(counter);
        this.setState({songCounter: counter});

    }

    myFunction2() {

        // Declare variables
        let input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput2");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable2");
        tr = table.getElementsByTagName("tr");
        let counter = 0;

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    ++counter;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }

        console.log(counter);
        this.setState({songCounter2: counter});

    }


    render() {

        let isAdm = true;

        return (
            <>
                <div className="wrapper" id="wrapper">
                    {
                        isAdm ? <NavBarAdm />:<NavBar />
                    }

                    <div className="container" id="bdy">
                        <h1>Song Reports</h1>

                        <div className="tableBody">
                            <input type="text" id="myInput" onKeyUp={() => this.myFunction()} placeholder={this.state.search_value}/>
                                <button className="button" id="searchBtn" onClick={() => this.searchFldButton()}>
                                    <ArrowDropDownIcon/>
                                </button>
                            {/*<br/>*/}

                            <div className="counterContainer" id="songCounter">
                                <h4># of Songs reported: </h4>
                                {
                                    (this.state.songCounter > 0) ? <h4>{this.state.songCounter}</h4>:"No songs"
                                }
                            </div>


                            <table id="myTable" className="table table-striped table-bordered table-sm"
                                   cellSpacing="0" width="100%">
                                <thead>
                                <tr>

                                    {
                                        this.state.search_Counter ? <th className="th-sm">Genre</th> : <th className="th-sm">Artist</th>
                                    }
                                    {/*<th className="th-sm">Artist*/}
                                    {/*</th>*/}
                                    {/*<th className="th-sm">Genre*/}
                                    {/*</th>*/}
                                    <th className="th-sm">Song name
                                    </th>
                                    <th className="th-sm">Album
                                    </th>
                                    <th className="th-sm">Track ID
                                    </th>
                                    <th className="th-sm">Release date
                                    </th>
                                    <th className="th-sm">Snippet
                                    </th>
                                </tr>
                                </thead>
                                <tbody>


                                {

                                    this.state.songs.length > 0 ? this.state.songs.map((res)=>{

                                        let audioUrl = res["preview_url"];

                                        return(
                                            <>
                                                <tr>

                                                    {
                                                        this.state.search_Counter ? <td id="genre">{res["genres"]}</td> : <td id="artist">{res["artist"]}</td>
                                                    }

                                                    <td>{res["name"]}</td>
                                                    <td>{res["album"]}</td>
                                                    <td>{res["id"]}</td>
                                                    <td>{res["release_date"]}</td>
                                                    <td>
                                                        <audio
                                                            controls
                                                            src={audioUrl}>
                                                        </audio>
                                                    </td>
                                                </tr>

                                            </>
                                        )

                                    }): ""


                                }


                                </tbody>

                            </table>

                            <div>
                                <button type="button" className="btn btn-primary btn-lg m-lg-6" onClick={this.onClick}>Click</button>
                            </div>

                            <br/>
                            <br/>
                            <br/>

                            <h1 className="m-3">Playlist Reports</h1>
                            <input type="text" id="myInput2" onKeyUp={() => this.myFunction2()} placeholder="Date in the format 'YYYY-MM-DD'"/>
                            <div className="counterContainer" id="songCounter">
                                <h4># of Playlist: </h4>
                                {
                                    (this.state.songCounter2 > 0) ? <h4>{this.state.songCounter2}</h4>:""
                                }
                            </div>

                            <table id="myTable2" className="table table-striped table-bordered table-sm"
                                   cellSpacing="0" width="100%">

                                <thead>
                                <tr>

                                    <th className="th-sm">Date Created
                                    </th>
                                    <th className="th-sm">Playlist name
                                    </th>
                                    <th className="th-sm">id
                                    </th>
                                    <th className="th-sm">Community playlist
                                    </th>
                                </tr>
                                </thead>
                                <tbody>

                            {
                                this.state.list.length > 0 ? this.state.list.map((res)=>{


                                    let pub;

                                    if(res.isPublic == true)
                                        pub = "True"
                                    else
                                        pub = "False"

                                    return(
                                        <>
                                            <tr>

                                                <td>{res.dateCreated}</td>
                                                <td>{res.name}</td>
                                                <td>{res.id}</td>
                                                <td>{pub}</td>

                                            </tr>

                                        </>
                                    )
                                }):""
                            }

                                </tbody>

                            </table>

                        </div>
                    </div>

                </div>

            </>
        );
    }
}


export default Reports;
