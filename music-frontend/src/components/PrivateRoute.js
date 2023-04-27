import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({children})
{
    const {currentUser} = useContext(AuthContext);
    console.log();

    console.log(currentUser.isActive == false)

    if(currentUser.isActive == false){
        alert("User is not active. Reach out to Admin to un pause your account")
        return <Navigate to="/SignOut" replace={true} />
    }

    if(currentUser != null & Object.keys(currentUser).length > 0) {
        //console.log(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser));
    }

    return currentUser ? children : <Navigate to="/" replace={true} />

}
export default PrivateRoute;
