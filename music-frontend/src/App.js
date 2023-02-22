import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
      <AuthProvider>

          <Router>
              <Routes>
                  <Route path="/" element={<SignUp/>}/>
                  <Route path="/Home" element={<Home/>}/>
                  <Route path="/SignIn" element={<SignIn/>}/>
              </Routes>
          </Router>

      </AuthProvider>
  );
}

export default App;
