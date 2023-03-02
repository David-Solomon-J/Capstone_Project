import '../App.css';
import NavBar from './NavBar'
import '../styles/styles.css'

let client_id = "4bcd6ab963f844cd984df774aac47791";
let client_secret =   "9c1f076f76c145b4a221386761209322";
let num;

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
        .then(() => console.log(num));

}

const getPlaylist = async (token) => {

    const plyListURL = 'https://api.spotify.com/v1/browse/featured-playlists?limit=20';
    const result = await fetch(plyListURL, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    })
        .then(res => res.json())
        .then(data => assignPY(data.playlists.items));


}

let assignTK = (x) => {
    num = x;
    //console.log(num);
    console.log("Token is: " + num)
    return num;
}

getToken();
getPlaylist(num);

function songSearch() {
    return (
        <>
            <div className="wrapper" id="wrapper">
            <div id="navBar"><NavBar/></div>
                <div className="container" id="bdy">
                    <h1>Search</h1>
                </div>

            </div>
        </>
    );
}

export default songSearch;
