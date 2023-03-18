import NavBar from './NavBar'
import NavBarAdm from './NavBarAdm'
import '../styles/styles.css'
import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../context/AuthContext";




function UserSearch() {

    const context = useContext(AuthContext);
    let list = context.users;

    context.getUsers();

    let isAdm = true;


        return (
            <>
                <div className="wrapper" id="wrapper">
                    {
                        isAdm ? <NavBarAdm />:<NavBar />
                    }
                    <div className="container" id="bdy">
                        <h1>User Search</h1>
                        {/*<h3>{users}</h3>*/}
                        {/*{*/}
                        {/*    list.length > 0 ?list.map(res => {*/}
                        {/*        // console.log(res);*/}
                        {/*        // let addr = encodeURIComponent(apt.address)*/}
                        {/*        // return (*/}
                        {/*        //     <tr>*/}
                        {/*        //         <td><img style = {{width:"150px", height:"100px"}} src={apt.photo}/></td>*/}
                        {/*        //         <td>{res.user_Fname}</td>*/}
                        {/*        //         <td><a href={'https://www.google.com/maps/search/?api=1&query='+ addr}>{apt.address}</a></td>*/}
                        {/*        //         <td>{res.user_Lname}</td>*/}
                        {/*        //         <td>{res.user_id}</td>*/}
                        {/*        //         <td>{res.user_email}</td>*/}
                        {/*        //         <td><button classname="Likes" type="button" onClick={(event) => this.insert(event,apt.property_id)}>Likes</button></td>*/}
                        {/*        //*/}
                        {/*        //*/}
                        {/*        //     </tr>*/}
                        {/*        // )*/}
                        {/*    }):*/}
                        {/*        "Loading"*/}
                        {/*}*/}
                    </div>

                </div>
            </>
        );
}


export default UserSearch;
