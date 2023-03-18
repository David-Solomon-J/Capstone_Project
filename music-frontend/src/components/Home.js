import NavBar from './NavBar'
import NavBarAdm from './NavBarAdm'
import '../styles/styles.css'
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import EditIcon from '@mui/icons-material/Edit';

function Home() {

    const context = useContext(AuthContext)

    //let user = JSON.parse(localStorage.getItem("user"));
    //this.setState({user: user})
    // console.log(user.uid);
    //
    // context.getInfo(user.uid);
    // console.log(context.currentUser);

    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem("user"));
        context.getInfo(user.uid);
        //setUser(user);
    },[])

    //console.log(context.currentUser);


    const [isOpen, setIsOpen] = useState(false);

    async function HandleClick(event) {
        setIsOpen(true);
    }

    async function HandleSubmit(event) {
        let name = document.getElementById('nameInput').value;
        //console.log(context.currentUser.user_id);
        context.changeName(context.currentUser.user_id, name);
        setIsOpen(false);
    }

        return (
            <>
                <div className="wrapper" id="wrapper">
                    {
                        context.currentUser.isAdmin ? <NavBarAdm />:<NavBar />
                    }

                    <div className="container" id="homeBdy">

                        <h1>Home</h1>

                        <div className="container bootstrap snippets bootdey">
                            <div className="panel-body inf-content">
                                <div className="row">
                                    <div className="col-md-8 mt-2 m-lg-5">
                                        <strong>Information</strong><br/>
                                        <div className="table-responsive">
                                            <table className="table table-user-information">
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <strong>

                                                            <span
                                                                className="glyphicon glyphicon-asterisk text-primary"></span>
                                                            First Name
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">
                                                        {context.currentUser.user_Fname}
                                                    </td>
                                                    <td>
                                                        <div className="button" onClick={HandleClick}>
                                                            <EditIcon/>
                                                            {
                                                                isOpen ?
                                                                    <form className="mx-1 mx-md-4" >
                                                                    <input type="text" className="form-control" placeholder="New Name"
                                                                           aria-label="Username" aria-describedby="basic-addon2"
                                                                           id="nameInput"/>
                                                                    <button type="button" className="btn btn-primary btn-sm" onClick={HandleSubmit}>Update</button>
                                                                    </form>
                                                                    : ""
                                                            }

                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            <span
                                                                className="glyphicon glyphicon-user  text-primary"></span>
                                                            Last Name
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">
                                                        {context.currentUser.user_Lname}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            <span
                                                                className="glyphicon glyphicon-cloud text-primary"></span>
                                                            Email
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">
                                                        {context.currentUser.user_email}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        <strong>
                                                            <span
                                                                className="glyphicon glyphicon-bookmark text-primary"></span>
                                                            ID
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">
                                                        {context.currentUser.user_id}
                                                    </td>
                                                </tr>


                                                <tr>
                                                    <td>
                                                        <strong>
                                                            <span
                                                                className="glyphicon glyphicon-eye-open text-primary"></span>
                                                            Is Admin
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">
                                                        {
                                                            context.currentUser.isAdmin ? "True":"False"
                                                        }
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>

                </div>
            </>
        );
}

export default Home;
