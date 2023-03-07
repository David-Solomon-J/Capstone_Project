import NavBar from './NavBar'
import '../styles/styles.css'
import React, {Component, useState} from 'react';

const MyPlyst = () => {

    const[name, setName] = useState('David');

    function handelClick(){
        setName("David Solomon")
    }


    return (
        <>
            <div className="wrapper" id="wrapper">
                <div id="navBar"><NavBar/></div>
                <div className="container" id="bdy">
                    <h1>Your playlist</h1>
                    <h4>Hello my name is { name }</h4>

                   <button onClick={handelClick}>Click Me</button>
                </div>

            </div>
        </>
    );
}

export default MyPlyst;
