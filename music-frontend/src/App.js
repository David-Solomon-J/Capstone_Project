import './App.css';
import SignUp from './components/SignUp';
import {AuthProvider} from "./context/AuthContext";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
      <AuthProvider>

          <Router>
              <Routes>
                  <Route path="/" element={<SignUp/>}/>
              </Routes>
          </Router>

      </AuthProvider>
  );
}

export default App;
