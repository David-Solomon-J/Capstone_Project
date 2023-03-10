import NavBar from './NavBar'
import '../styles/songSearch.scss'
import React, {Component} from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';



class SongSearch  extends Component{
    constructor(props) {
        super(props);
        this.state = {songs: [], tk: ""}
        this.handelClick = this.handelClick.bind(this);

    }


    componentDidMount() {

        let client_id = "4bcd6ab963f844cd984df774aac47791";
        let client_secret = "9c1f076f76c145b4a221386761209322";
        let key = '';
        let num = '';

        let qInput = 'Kendrick';
        let tInput = 'track';
        let gInput = 'Rap';


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


        /*const getTracks = async (token) => {

            const plyListURL = 'https://api.spotify.com/v1/search?query=' + qInput + '&type=' + tInput + '&genre=' + gInput;
            const resultSongs = await fetch(plyListURL, {
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + token}
            })
                .then(res => res.json())
                .then(res => assign(res.tracks.items));


        }*/

        let assignTK = (x) => {
            this.setState({tk: x})
            console.log(this.state.tk);

            //getTracks(x);
            return num;
        }


        getToken();


    }

    handelClick(qInput){
        console.log("hello")

        //let qInput = 'Duckwrth';
        let tInput = 'track';
        let gInput = 'Rap';

        const getTrack = async () => {

            const plyListURL = 'https://api.spotify.com/v1/search?query=' + qInput + '&type=' + tInput + '&genre=' + gInput;
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

    render(){
    return(

        <>
            <div className="wrapper" id="wrapper">
                <div id="navBar"><NavBar/></div>
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
                    <button className="btn btn-secondary btn-large" onClick={() => this.handelClick("Kendrick")}>
                        Kendrick Lamar
                    </button>

                    <button className="btn btn-secondary btn-large" onClick={() => this.handelClick("Drake")}>
                        Drizzy
                    </button>

                        <button className="btn btn-secondary btn-large" onClick={() => this.handelClick("J.cole")}>
                        Cole World
                    </button>
                    </div>
                </div>

            {/*</div>*/}
        </>
        )
    }
}


export default SongSearch;
