
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { incNumber, decNumber } from './actions/index';
import Login from './pages/login';
import SignUp from './pages/signup';
import Home from './pages/Home';
import Profile from './pages/profile';
import { Routes, Route, Link, BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import NavBar from './components/NavBar';
import MutualFundItem from './pages/mutualFundList';

function App() {
 
  const dispatch = useDispatch();
  const userState = useSelector((state) => state)
  console.log(userState)
 
  return (

    <Router>
      <div>
        

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
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
    // <div className="App">
      
    //   <button onClick={() => dispatch(incNumber())}>+</button>
    //   {count}
    //   <button onClick={() => dispatch(decNumber())}>-</button>
      
    // </div>
  );
}

export default App;


// {"userState":{"user":{"role":"user","isEmailVerified":false,"name":"sam","email":"nuniasuman55@gmail.com","id":"617c0b9aa9d8c50dc831a154"},"tokens":{"access":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTdjMGI5YWE5ZDhjNTBkYzgzMWExNTQiLCJpYXQiOjE2MzU1ODEyOTMsImV4cCI6MTYzNTU4NDg5MywidHlwZSI6ImFjY2VzcyJ9.xhTXW370iOZiCb-rs3iteilCqq-6Bp8ZrpMkyPIAXgY","expires":"2021-10-30T09:08:13.229Z"},"refresh":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTdjMGI5YWE5ZDhjNTBkYzgzMWExNTQiLCJpYXQiOjE2MzU1ODEyOTMsImV4cCI6MTYzODE3MzI5MywidHlwZSI6InJlZnJlc2gifQ.vYI2EZzzy0yA4SKO1Fe63DlZt9wRf4EB-o0ygGdibeI","expires":"2021-11-29T08:08:13.231Z"}}}}