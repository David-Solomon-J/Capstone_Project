import React, {Component, useRef} from 'react';
import axios from "axios";
import {initializeApp} from "firebase/app";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";



export const AuthContext = React.createContext({
    currentUser: {},
    errors: [],
    refresh: null,
    setErrors: () =>{},
    setCurrentUser: () => {},
    getUsers: () =>{},
    getInfo: () =>{},
    changeName: () => {},
    signIn: () =>{},
    signOut: () =>{},
    signUp: () =>{},

})

export class AuthProvider extends Component {
    uidNum;


    state = {
        currentUser: {},
        setErrors: (errObject, append) => {
            if(append)
            {
                let e = this.state.errors;
                e.push(errObject);
                this.setState({errors: e});
            }
            else{
                this.setState({errors: [errObject]});
            }
        },
        setCurrentUser: user =>{
            this.setState({currentUser: user})
        },
        addToCart: item =>{
            let cart = this.state.cart;
            cart.push(item);
            this.setState({cart: cart});
        },
        removeFromCart: item => {
            let cart = this.state.cart;
            cart = cart.filter( (val, idx, arr) => {
                return val !== item;
            });
            this.setState({cart: cart});
        },
        signIn: async (email, password)=>{

            const firebaseConfig = {
                apiKey: "AIzaSyC3Bg51SA_DrEwfaF4u4rGb7MuSdnSHY9E",
                authDomain: "capstoneproj-music.firebaseapp.com",
                projectId: "capstoneproj-music",
                storageBucket: "capstoneproj-music.appspot.com",
                messagingSenderId: "81179338296",
                appId: "1:81179338296:web:3199ab9d91c91054eaa8cd"
            };

            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);

            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then(async (cred)=>{
                    console.log(cred.user.uid);
                    this.uidNum = cred.user.uid;


                    let user = cred.user;
                    let res = await user.getIdTokenResult(false);

                    this.state.setCurrentUser(user);
                    localStorage.setItem("user", JSON.stringify(this.state.currentUser));


                    let token = res.token;
                    localStorage.setItem("firebaseResponse", JSON.stringify(res));

                    // let headers = {"Authorization": "Bearer " + token}
                    //
                    // await axios.post ("http://localhost:8080/auth/session", document.body, {
                    //     headers: headers,
                    //     context: document.body
                    // }).then((res)=>{
                    //     this.state.setCurrentUser(res.data.User);
                    //     localStorage.setItem("user", JSON.stringify(this.state.currentUser));
                    // }).catch((err) => {
                    //     console.log(err);
                    //     this.state.setErrors(err.response.data, false);
                    // })

                })
                .catch(function (err) {
                    // Handle Errors here.
                    console.log(this)
                    this.setCurrentUser(null);
                    this.setErrors(err.response, false);
                });

            //refersh token every 30 minutes
            this.state.refresh = setInterval(this.getRefresh, 300000, auth)
        },
        signOut: async ()=>{
            await axios.get("http://localhost:3000/logout").then( res =>{
                this.state.setCurrentUser({});
                localStorage.removeItem("user");
                localStorage.removeItem("firebaseResponse");
                //stop token refresh
                clearInterval(this.state.refresh );
            }).catch(err => console.log(err));
        },
        getUsers: async ()=>{

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

            const call = async () => {
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
            //
            // snapshot.forEach(doc => {
            //     console.log(doc.id, '=>', doc.data());
            //     this.setState({users: doc.data()});
            // });

            list = await call();
            console.log(list);

            return await call();
        },

        getInfo: async (ID)=> {

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
            let id = "8Qk89MDMptOm81UjKlh0h85QZA63";

            const userRef = db.collection('User');

            //Working Set Function!!!!!
            // await userRef.doc('tWBi0IWXnSTbNSYNCZ2VcZAVGcu2').set({
            //     isAdmin: false
            // });

            const doc = await userRef.doc(ID).get();

            if (!doc.exists) {
                console.log('No such document!');

            } else {
                this.state.setCurrentUser(doc.data());
                //console.log('Document data:', doc.data());
            }

            },

        changeName: async (ID, name)=> {

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


            const userRef = db.collection('User');

            //Working Set Function!!!!!
            await userRef.doc(ID).update({
                user_Fname: name
            });

        },

        signUp: async (email, password)=>{
            const firebaseConfig = {
                apiKey: "AIzaSyC3Bg51SA_DrEwfaF4u4rGb7MuSdnSHY9E",
                authDomain: "capstoneproj-music.firebaseapp.com",
                projectId: "capstoneproj-music",
                storageBucket: "capstoneproj-music.appspot.com",
                messagingSenderId: "81179338296",
                appId: "1:81179338296:web:3199ab9d91c91054eaa8cd"
            };

            // Initialize Firebase
            initializeApp(firebaseConfig);

            const auth = getAuth();
            let flag = false;

            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;

                    // ...
                    flag = true;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    //this.state.setErrors(error.response.data, false);
                    // ..
                });
            return flag;
        },

    }

    getRefresh(auth){

        auth.currentUser.getIdToken(true).then((response)=>{
            let fbResponse = localStorage.getItem("firebaseResponse")
            fbResponse = (fbResponse ? JSON.parse(fbResponse) : {})
            fbResponse.token = response.id_token;
            localStorage.setItem("firebaseResponse", JSON.stringify(fbResponse))
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {

        const { children } = this.props
        const {currentUser, errors, cart,refresh, setErrors, setCurrentUser, getUsers, getInfo, changeName, signIn, signOut, signUp } = this.state

        return (
            <AuthContext.Provider value={{currentUser, errors, cart, refresh, setErrors, setCurrentUser, getUsers, getInfo, changeName, signIn, signOut, signUp}}>
                {children}
            </AuthContext.Provider>
        );
    }
}

export const AuthConsumer = AuthContext.Consumer;
