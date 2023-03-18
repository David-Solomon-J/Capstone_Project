import NavBar from './NavBar'
import '../styles/styles.css'
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import NavBarAdm from "./NavBarAdm";

function GenPlyst() {

    const context = useContext(AuthContext);
    const[plylist, setPlylist] = useState([]);
    let tk = "";

    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem("user"));
        context.getInfo(user.uid);
        //setUser(user);
    },[])


    let isAdm = true;

    let client_id = "4bcd6ab963f844cd984df774aac47791";
    let client_secret = "9c1f076f76c145b4a221386761209322";


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

    function handelClick(qInput){
        console.log("hello")

        //let qInput = 'Duckwrth';
        let tInput = 'track';
        let gInput = 'Rap';

        const getTrack = async () => {

            const plyListURL = 'https://api.spotify.com/v1/search?query=' + qInput + '&type=' + tInput + '&genre=' + gInput + "&limit=30" + '&query=Kendrick' ;
            const resultSongs = await fetch(plyListURL, {
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + tk}
            })
                .then(res => {
                    return res.json()
                })
                .then(res => {
                    //console.log(res)
                    setPlylist(current => [...current, res])
                })

        }
        getTrack();
    }

    console.log(plylist);

    return (
        <>
            <div className="wrapper" id="wrapper">
                {
                    context.currentUser.isAdmin ? <NavBarAdm />:<NavBar />
                }
                <div className="container" id="bdy">
                    <h1>Generate Playlist</h1>

                    <div className="col d-flex align-content-center">
                        <button className="btn btn-secondary btn-large" onClick={() => handelClick("Daniel Caesar")}>
                            Dainel Ceasear
                        </button>
                    </div>

                    <br/>

                    <div className="col">
                        <button className="btn btn-secondary btn-large" onClick={() => handelClick("Biggie")}>
                            Biggie Smalls
                        </button>
                    </div>

                    <br/>

                    <div className="col">
                        <button className="btn btn-secondary btn-large" onClick={() => handelClick("Lil Wayne")}>
                            Weezy F Baby
                        </button>
                    </div>


                </div>

            </div>

            <div className="Footer bg-light" id="foot">
                <footer className="bg-light text-center text-lg-start mb-0">

                    <div className="container p-4">

                        <div className="row">

                            <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
                                <h5 className="text-uppercase">Your Playlist</h5>

                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
                                    molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae
                                    aliquam voluptatem veniam, est atque cumque eum delectus sint!

                                </p>
                            </div>


                            <div className="col-lg-10 col-md-12 mb-4 mb-md-0">
                                <table className="genPlyTbl">

                                <h3>Songs in playlist</h3>
                                {
                                    plylist.length > 0 ?plylist.map(res => {
                                        //console.log(res.tracks.items);

                                                console.log(res);
                                                return (
                                                    <>

                                                        {
                                                            res.tracks.items.map(res => {
                                                                let audioUrl = res.preview_url;
                                                                return (

                                                                    <tr>
                                                                        <td>{res.name}</td>
                                                                        <td>{res.artists[0].name}</td>
                                                                        <td>{res.album.name}</td>
                                                                        <td>
                                                                            <audio
                                                                                controls
                                                                                src={audioUrl}>
                                                                            </audio>
                                                                        </td>
                                                                        {/*<td>{res.user_id}</td>*/}
                                                                    </tr>

                                                                );
                                                            })
                                                        }

                                                    </>
                                                );

                                    }):
                                        "Select Filters for playlist"
                                }
                                </table>
                            </div>

                        </div>

                    </div>


                    {/*<div className="text-center p-3">*/}
                    {/*    © 2020 Copyright:*/}
                    {/*    <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>*/}
                    {/*</div>*/}

                </footer>

            </div>
        </>
    );
}

export default GenPlyst;
