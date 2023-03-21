import {Link, useNavigate} from "react-router-dom";
import '../styles/styles.css'
import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../context/AuthContext";




function SignOut() {

    const context = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        console.log("Hey")
        context.signOut();
        navigate("/");
    },)


    return(
        <></>
    )


}


export default SignOut;
