
import './App.css';

import Login from './pages/login';
import SignUp from './pages/signup';
import Home from './pages/Home';
import Profile from './pages/profile';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import NavBar from './components/NavBar';
import MutualFundItem from './pages/mutualFundList';

function App() {
 
  return (

    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
         
         
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mutual-fund/:id" element={<MutualFundItem />} />

            
          
          
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;


