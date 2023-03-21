import NavBar from './NavBar'
import '../styles/styles.css'
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import NavBarAdm from "./NavBarAdm";

function Messages() {
    const context = useContext(AuthContext)

    useEffect(()=>{
        //let user = JSON.parse(localStorage.getItem("user"));

        context.getInfo(context.currentUser.uid);
        //setUser(user);
    },[])

    return (
        <>
            <div className="wrapper" id="wrapper">
                {
                    context.currentUser.isAdmin ? <NavBarAdm />:<NavBar />
                }
                <div className="container" id="bdy">
                    <h1>Messages</h1>
                </div>

            </div>
        </>
    );
}

export default Messages;
