import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserState } from '../actions/index';


const NavBar = () => {
    const userState = useSelector((state) => state);
    const dispatch = useDispatch();
    // console.log(userState);

    const logout = () => {
        localStorage.removeItem('user');
        dispatch(setUserState());
    };
    return (
        <>
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Mutual Fund</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        
                            {userState.userState && <>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {userState.userState && userState.userState.user.name.slice(0, 4) + '...'}
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                                        <li><button className="btn" onClick={logout}>Logout</button></li> 
                                    </ul>
                                </li>
                            </>}
                            {!userState.userState && <>
                                <li className="nav-item">
                                    <Link className="nav-link login-btn-anchor" to="/login">Login</Link>
                                </li>
                            </>}
                        
                    </ul>
                    
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;