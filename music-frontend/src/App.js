import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SongSearch from "./components/SongSearch";
import MyPlyst from "./components/MyPlyst";
import GenPlyst from "./components/GenPlyst";
import Home from './components/Home';
import Messages from './components/Messages';
import Reports from './components/Reports';
import UserSearch from "./components/UserSearch";
import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

function App() {

  return (
      <AuthProvider>

          <Router>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/Reports" element={<Reports/>}/>
                  <Route path="/UserSearch" element={<UserSearch/>}/>
                  <Route path="/SignUp" element={<SignUp/>}/>
                  <Route path="/SignIn" element={<SignIn/>}/>
                  <Route path="/MyPlyst" element={<MyPlyst/>}/>
                  <Route path="/GenPlyst" element={<GenPlyst/>}/>
                  <Route path="/Messages" element={<Messages/>}/>
                  <Route path="/songSearch" element={<SongSearch/>}/>
              </Routes>
          </Router>

      </AuthProvider>
  );
    // App.use(cors(corsOptions));
}


export default App;
