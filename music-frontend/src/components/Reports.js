import NavBar from './NavBar'
import NavBarAdm from './NavBarAdm'
import '../styles/styles.css'
import React, {Component} from 'react';

class Reports extends Component {
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
                        <h1>Reports</h1>
                    </div>

                </div>
            </>
        );
    }
}


export default Reports;
