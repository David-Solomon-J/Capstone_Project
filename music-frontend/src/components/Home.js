import NavBar from './NavBar'
import NavBarAdm from './NavBarAdm'
import '../styles/styles.css'
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import EditIcon from '@mui/icons-material/Edit';

function Home() {

    const context = useContext(AuthContext)
    const[plylist, setPlylist] = useState([])

    let tk = "";

    let client_id = "4bcd6ab963f844cd984df774aac47791";
    let client_secret = "9c1f076f76c145b4a221386761209322";

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

        const plyListURL = 'https://api.spotify.com/v1/browse/featured-playlists?limit=5';
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

    console.log(plylist);
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
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="containerPlylist">
                            <div className="row m-lg-2">
                                {
                                    plylist.map((playlist)=>{
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



                                                    </div>
                                                    <br/>

                                                    <br/>
                                                    <button className="btn btn-light">Save playlist</button>

                                                </div>
                                            </div>
                                        )

                                    })

                                }
                            </div>
                        </div>

                    </div>

                </div>
            </>
        );
}

export default Home;
