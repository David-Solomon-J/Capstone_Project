import '../App.css';
import NavBar from './NavBar'
import '../styles/styles.css'

function Messages() {
    return (
        <>
            <div className="wrapper" id="wrapper">
                <div id="navBar"><NavBar/></div>
                <div className="container" id="bdy">
                    <h1>Messages</h1>
                </div>

            </div>
        </>
    );
}

export default Messages;
