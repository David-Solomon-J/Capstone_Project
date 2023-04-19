import NavBar from './NavBar'
import NavBarAdm from './NavBarAdm'
import '../styles/styles.css'
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';




function UserSearch() {

    const[myList, setList] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
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
            let stuff = [], list = [];


            const DocumentReference = db.collection("User");

            const Call = async () => {
                const snapshot = await DocumentReference.get().then(
                    res => {
                        res.forEach(doc => {
                            //console.log(doc.id, '=>', doc.data());
                            stuff.push(doc.data())
                        });
                        return stuff;
                    }
                );

                return snapshot
            }


            list = await Call();

            setList(list);

            console.log(list);

        }

        getUsers();
    }, [])

    const context = useContext(AuthContext);
    let isAdm = true;


        return (
            <>
                <div className="wrapper" id="wrapper">
                    {
                        isAdm ? <NavBarAdm />:<NavBar />
                    }
                    <div className="container" id="bdy">
                        <h1>User Search</h1>
                        <h3></h3>
                        {
                            myList.length > 0 ?myList.map(res => {
                                // console.log(res);
                                // let addr = encodeURIComponent(apt.address)
                                let admin="";

                                res.isAdmin ? admin = "True":admin = "False"

                                return (
                                    <tr>
                                        <td>{res.user_Fname}</td>
                                        <td>{res.user_Lname}</td>
                                        <td>{res.uid}</td>
                                        <td>{res.user_email}</td>
                                        <td>{admin}</td>
                                        {/*<td><button classname="Likes" type="button" onClick={(event) => this.insert(event,apt.property_id)}>Likes</button></td>*/}


                                    </tr>
                                )
                            }):
                                "Loading"
                        }
                    </div>

                </div>
            </>
        );
}


export default UserSearch;
