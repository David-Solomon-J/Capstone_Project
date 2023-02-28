import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SongSearch from "./components/songSearch";
import MyPlyst from "./components/MyPlyst";
import GenPlyst from "./components/GenPlyst";
import Home from './components/Home';
import Messages from './components/Messages'
import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
      <AuthProvider>

          <Router>
              <Routes>
                  {/*<Route path="/" element={<SignUp/>}/>*/}
                  <Route path="/" element={<Home/>}/>
                  <Route path="/SignIn" element={<SignIn/>}/>
                  <Route path="/MyPlyst" element={<MyPlyst/>}/>
                  <Route path="/GenPlyst" element={<GenPlyst/>}/>
                  <Route path="/Messages" element={<Messages/>}/>
                  <Route path="/songSearch" element={<SongSearch/>}/>
              </Routes>
          </Router>

      </AuthProvider>
  );
}

export default App;
