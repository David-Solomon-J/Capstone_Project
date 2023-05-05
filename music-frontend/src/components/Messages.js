import NavBar from './NavBar'
import '../styles/styles.css'
import React, {useContext, useEffect, useState} from 'react';
import Msg from "../components/MesTable"
import {AuthContext} from "../context/AuthContext";
import NavBarAdm from "./NavBarAdm";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import SendIcon from '@mui/icons-material/Send';

function Messages() {

    const[con, setCon] = useState([]);
    const[conCard, setConCard] = useState([]);
    const[id, setId] = useState("");
    const [showTable, setShowTable] = useState(false);
    const[myList, setList] = useState([]);
    const[fullList, setFullList] = useState([]);

    const context = useContext(AuthContext)
    const firebaseConfig = {
        apiKey: "AIzaSyC3Bg51SA_DrEwfaF4u4rGb7MuSdnSHY9E",
        authDomain: "capstoneproj-music.firebaseapp.com",
        projectId: "capstoneproj-music",
        storageBucket: "capstoneproj-music.appspot.com",
        messagingSenderId: "81179338296",
        appId: "1:81179338296:web:3199ab9d91c91054eaa8cd"
    };

    useEffect(()=>{
        // let user = JSON.parse(localStorage.getItem("user"));

        context.getInfo(context.currentUser.uid);
        //setUser(user);
    },[])

    let user = JSON.parse(localStorage.getItem("user"));
    //console.log(user)


    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    let conversations = [];

    useEffect(() => {
        const getUsers = async () => {

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
            setFullList(list);

            //console.log(list);

        }

        getUsers();
    }, [])


    const fetchData = async (res) => {
        try {
            const doc = await db.collection("Messages").doc(res).get();
            if (doc.exists) {
                const data = doc.data();
                const updatedConversations = [...conversations];
                updatedConversations.push(data);
                setCon(updatedConversations);
                //console.log(updatedConversations);
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.log("Error getting document:", error);
        }
    };

    function ConCard(res) {
        //console.log(res)
        fetchData(res);
    }



    async function fillConCard(res) {
        try {
            const data = await fetchDataCon(res);
            const updatedConversations = [...conversations];
            updatedConversations.push(data);
            //setConCard(updatedConversations);
            //console.log(updatedConversations);
            return data;
        } catch (error) {
            console.log("Error getting document:", error);
        }
    }

    async function fetchDataCon(res) {
        try {
            const doc = await db.collection("Messages").doc(res).get();
            if (doc.exists) {
                const data = doc.data();
                return data;
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.log("Error getting document:", error);
        }
    }


    let filled = false;

    if(con[0] != undefined) {

        //console.log(con[0]);
        filled = true;

    }


    function sendMsg(id){

        const msgSn = document.querySelector('#messageSn');
        const msg = msgSn.value;


        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        db.collection("Messages").doc(id).update({
            messages: firebase.firestore.FieldValue.arrayUnion(msg)
        }).then(r => {
            console.log("Message sent");
        })

        setTimeout(function() {
            window.location.href = window.location.href;
        }, 2000);
    }

    const toggleTable = () => {
        setShowTable(!showTable);
    };


    function strMsg(id){

        let input = window.prompt("Please enter your Message:", "Hello");

        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        db.collection("Messages").doc(id).update({
            messages: firebase.firestore.FieldValue.arrayUnion(input)
        }).then(r => {
            console.log("Message sent");
        })

    }


    async function startConvo(res) {

        const db = firebase.firestore();
        const msgCollection = db.collection('Messages');
        const conId = msgCollection.doc().id;

        let name = user.user_Fname + " " + user.user_Lname;
        let frstMsg = "Conversation has started!"
        let toMsg = res.user_Fname + " " + res.user_Lname;

        await msgCollection.doc(conId).set({
            convo_id: conId,
            from: name,
            messages:frstMsg,
            to: toMsg
        });

        strMsg(conId);

        db.collection("User").doc(user.uid).update({
            convos: firebase.firestore.FieldValue.arrayUnion(conId)
        }).then(r => {
            console.log("Conversation started");
        })

        console.log(res)

        db.collection("User").doc(res.uid).update({
            convos: firebase.firestore.FieldValue.arrayUnion(conId)
        }).then(r => {
            console.log("Conversation started");
        })


        setTimeout(function() {
            window.location.href = window.location.href;
        }, 3000);

    }

    return (
        <>
            <div className="wrapper" id="wrapper">
                {
                    context.currentUser.isAdmin ? <NavBarAdm />:<NavBar />
                }
                <div className="container" id="bdy">
                    <h1>Messages</h1>

                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                {
                                    user.convos != undefined ? user.convos.map((res) => {


                                        let data;

                                        async function getInfo() {
                                            data = await fillConCard(res);
                                            //console.log(data)
                                            return data;
                                        }

                                        data = getInfo()

                                        return (
                                            <div className="card m-2" type="button" onClick={() => ConCard(res)}>
                                                <Msg id={res} user={user}/>
                                            </div>
                                        )
                                    }):""
                                }

                            </div>
                            <div className="col-sm-8">
                                <div className="card">
                                    <div className="card-body">{
                                        con[0] != undefined ? con.map((res) => {

                                            return(
                                                <div>
                                                    <h5 className="card-title">Messages</h5>

                                                    {
                                                        con[0] != undefined ? res.messages.map((res) => {

                                                            return(
                                                                <p className="card-text">{res}</p>
                                                            )

                                                        }):""
                                                    }

                                                    <input type="text" id="messageSn" name="messageSn"></input>
                                                    <button type="button" id="sendMsg" onClick={() => sendMsg(res.convo_id)}>
                                                        <SendIcon/>
                                                    </button>
                                                </div>
                                            )

                                        }):""
                                    }


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer">

                        <div>
                            <button onClick={toggleTable}>Start Conversation</button>
                            {showTable && (
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Users</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        myList.length > 0 ?myList.map(res => {

                                            return(
                                            <button id="convoBtn" onClick={() => startConvo(res)}>
                                                <tr>
                                                    <td>{res.user_Fname} {res.user_Lname}</td>
                                                </tr>
                                            </button>
                                            )

                                        }):""
                                    }

                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Messages;
