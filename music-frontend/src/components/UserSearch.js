import NavBar from './NavBar'
import NavBarAdm from './NavBarAdm'
import '../styles/styles.css'
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";




function UserSearch() {

    const[myList, setList] = useState([]);
    const[search_value, setSearchValue] = useState("Search by Name...");
    const[songCounter, setSongCounter] = useState(1);

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

    //Filters and updates table according to query
    function myFunction() {

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
        setSongCounter(counter);

    }


    //Functionallity for alternating search param
    function searchFldButton() {

        let options = ["Search by Name...", "Search by ID..."];

        setSongCounter(songCounter + 1)
        setSearchValue(options[songCounter])

        if (songCounter >= 1) {
            setSongCounter(0)
        }
    }

        return (
            <>
                <div className="wrapper" id="wrapper">
                    {
                        isAdm ? <NavBarAdm />:<NavBar />
                    }
                    <div className="container" id="bdy">
                        <h2>Users Reports</h2>


                        <div className="tableBody">
                            <input type="text" id="myInput" onKeyUp={() => myFunction()} placeholder={search_value}/>
                            <button className="button" id="searchBtn" onClick={() => searchFldButton()}>
                                <ArrowDropDownIcon/>
                            </button>


                    <table id="myTable" className="table table-striped table-bordered table-sm"
                           cellSpacing="0" width="100%">
                        <thead>
                        <tr>
                            {/*{*/}
                            {/*     songCounter ? <th className="th-sm">Name</th> : <th className="th-sm">ID</th>*/}
                            {/*}*/}
                            <th className="th-sm">User ID
                            </th>
                            <th className="th-sm">Name
                            </th>

                            <th className="th-sm">Email
                            </th>
                            <th className="th-sm">Is Admin
                            </th>

                        </tr>
                        </thead>
                        <tbody>

                        {

                            myList.length > 0 ?myList.map(res => {

                                let admin;

                                res.isAdmin ? admin = "True":admin = "False"

                                return(
                                    <>
                                        <tr>
                                            {/*{*/}
                                            {/*    songCounter ? <td>{res.user_Fname} {res.user_Lname}</td> : <td>{res.uid}</td>*/}
                                            {/*}*/}
                                            <td>{res.uid}</td>
                                            <td>{res.user_Fname} {res.user_Lname}</td>
                                            <td>{res.user_email}</td>
                                            <td>{admin}</td>

                                        </tr>

                                    </>
                                )

                            }): ""


                        }


                        </tbody>

                    </table>
                        </div>


                </div>
                </div>
            </>
        );
}


export default UserSearch;
