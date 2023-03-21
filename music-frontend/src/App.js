import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SongSearch from "./components/SongSearch";
import MyPlyst from "./components/MyPlyst";
import GenPlyst from "./components/GenPlyst";
import Home from './components/Home';
import Messages from './components/Messages';
import SignOut from './components/SignOut'
import Reports from './components/Reports';
import UserSearch from "./components/UserSearch";
import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  return (
      <AuthProvider>

          <Router>
              <Routes>
                  <Route path="/Home" element={<PrivateRoute><Home/></PrivateRoute>}/>
                  <Route path="/Reports" element={<Reports/>}/>
                  <Route path="/UserSearch" element={<UserSearch/>}/>
                  <Route path="/SignUp" element={<SignUp/>}/>
                  <Route path="/" element={<SignIn/>}/>
                  <Route path="/SignOut" element={<SignOut/>}/>
                  <Route path="/MyPlyst" element={<MyPlyst/>}/>
                  <Route path="/GenPlyst" element={<GenPlyst/>}/>
                  <Route path="/Messages" element={<PrivateRoute><Messages/></PrivateRoute>}/>
                  <Route path="/songSearch" element={<SongSearch/>}/>
              </Routes>
          </Router>

      </AuthProvider>
  );
    // App.use(cors(corsOptions));
}


export default App;
