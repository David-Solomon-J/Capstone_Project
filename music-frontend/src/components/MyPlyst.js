import '../App.css';
import NavBar from './NavBar'
import '../styles/styles.css'

function MyPlyst() {
    return (
        <>
            <div className="wrapper" id="wrapper">
                <div id="navBar"><NavBar/></div>
                <div className="container" id="bdy">
                    <h1>Your playlist</h1>
                </div>

            </div>
        </>
    );
}

export default MyPlyst;
