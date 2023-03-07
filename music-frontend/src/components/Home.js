import NavBar from './NavBar'
import NavBarAdm from './NavBarAdm'
import '../styles/styles.css'
import React, {Component, useContext} from 'react';

class Home extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        let isAdm = true;

        return (
            <>
                <div className="wrapper" id="wrapper">
                    {
                        isAdm ? <NavBarAdm />:<NavBar />
                    }

                    <div className="container" id="bdy">
                        <h1>Home</h1>
                    </div>

                </div>
            </>
        );
    }
}


export default Home;
