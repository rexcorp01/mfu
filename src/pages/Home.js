import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const userState = useSelector((state) => state);
    console.log(userState);
    const navigate = useNavigate();
     useEffect(() => {
        if (userState.userState == null) {
            navigate('/login');
        }
    }, [userState.userState])
    return (
        <div>
            Lorem 
        </div>
    );
};

export default Home;