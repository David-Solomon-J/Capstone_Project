import NavBar from './NavBar'
import NavBarAdm from './NavBarAdm'
import '../styles/styles.css'
import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
// import React, {Component} from 'react';


function UserSearch() {

    const context = useContext(AuthContext);
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
                        {
                            // this.state.data.map((apt) => {
                            //     console.log(apt);
                            //     let addr = encodeURIComponent(apt.address)
                            //     return (
                            //         <tr>
                            //             <td><img style = {{width:"150px", height:"100px"}} src={apt.photo}/></td>
                            //             <td>{apt.prop_type}</td>
                            //             <td><a href={'https://www.google.com/maps/search/?api=1&query='+ addr}>{apt.address}</a></td>
                            //             <td>{apt.price}</td>
                            //             <td style = {{textAlign:"center"}}>{apt.beds}/{apt.baths}</td>
                            //             <td>{apt.pet_policy}</td>
                            //             <td>{apt.prop_status}</td>
                            //             <td><button classname="Likes" type="button" onClick={(event) => this.insert(event,apt.property_id)}>Likes</button></td>
                            //
                            //
                            //         </tr>
                            //     )
                            // })
                        }
                    </div>

                </div>
            </>
        );
}


export default UserSearch;
