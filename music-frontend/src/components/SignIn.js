import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useRef, useState, useEffect} from "react";
import {AuthContext} from "../context/AuthContext";
import "../styles/styles.css"
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';


function SignIn() {

    const context = useContext(AuthContext);
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [errors, setErrors] = useState([]);
    let navigate = useNavigate();


    async function HandleSubmit(event) {

        console.log("execute");
        event.preventDefault();


        await context.signIn(emailRef.current.value, passwordRef.current.value).then(() => {})

        console.log(context.currentUser)

        }

        useEffect(()=>{
            if(Object.keys(context.currentUser).length != 0)
            {
                context.setErrors(null, false);
                navigate("/Home");

            }
            else {
                setErrors(context.errors);
                //alert("Incorrect information")
            }
        },[context.currentUser])


    return (
        <div className="vh-100" id="T-level">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" id="C-level">
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>

                                        <form className="mx-1 mx-md-4" onSubmit={HandleSubmit}>


                                            <div className="input-group mb-3 w-100 center">
                                                {/*<FontAwesomeIcon icon="fa-solid fa-envelope" />*/}
                                                <span className="input-group-text" id="basic-addon1">Email</span>
                                                <input type="email" className="form-control" placeholder="Username" aria-label="Username"
                                                       aria-describedby="basic-addon1" required ref={emailRef}/>
                                                <PersonIcon className="m-lg-2"/>
                                            </div>

                                            <div className="input-group mb-6 w-100 center">
                                                <span className="input-group-text" id="basic-addon2">Password</span>
                                                <input type="password" className="form-control" placeholder="Password" aria-label="Username"
                                                       aria-describedby="basic-addon2" required ref={passwordRef}/>
                                                <LockIcon className="m-lg-2"/>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Login
                                                </button>

                                                <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <Link to="/SignUp">
                                                    <button type="button" className="btn btn-primary btn-lg">Sign Up</button>
                                                </Link>


                                            </div>

                                        </form>

                                    </div>
                                    <div
                                        className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample image"/>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default SignIn;
