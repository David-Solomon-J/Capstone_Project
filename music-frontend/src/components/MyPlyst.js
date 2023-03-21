import NavBar from './NavBar'
import '../styles/styles.css'
import React, {Component, useState} from 'react';
import NavBarAdm from "./NavBarAdm";

const MyPlyst = () => {

    const[name, setName] = useState('David');
    let user = JSON.parse(localStorage.getItem("user"));

    console.log(user.isAdmin);


    return (
        <>
            <div className="wrapper" id="wrapper">
                {
                    user.isAdmin ? <NavBarAdm />:<NavBar />
                }

                <div className="container" id="bdy">
                    <h1>Your playlist</h1>

                </div>

            </div>
        </>
    );
}

export default MyPlyst;
