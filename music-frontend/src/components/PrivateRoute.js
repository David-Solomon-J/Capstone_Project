import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({children})
{
    const {currentUser} = useContext(AuthContext);
    console.log();

    if(currentUser != null & Object.keys(currentUser).length > 0) {
        //console.log(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser));
    }

    return currentUser ? children : <Navigate to="/" replace={true} />

}
export default PrivateRoute;
