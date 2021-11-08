import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { getAll } from '../services';

const Home = () => {
    const userState = useSelector((state) => state);
    const [listOfMf, setListOfMf] = useState(null);
    console.log(userState);
    const navigate = useNavigate();
    useEffect(() => {
        if (userState.userState == null) {
            navigate('/login');
        }
    }, [userState.userState]);

    useEffect(() => {
        const data = getAll('https://api.mfapi.in/mf')
            .then((data) => {
                // console.log(data)
                setListOfMf(data.slice(0, 5));
            });
    }, []);
    console.log(listOfMf)
    return (
        <>
            <main>
                <article>
                    <div className="container mt-5 mb-5">
                        <div className="search-block">
                            <input type="search" className="form-control" />
                        </div>
                        {!listOfMf && <>
                            <div className="spinner-container">
                                <div className="spinner-border"></div>
                                <span>Please wait while we fetch the data...</span>
                            </div>
                        </>}
                        {listOfMf && listOfMf.map((item) => {
                            return <>

                                <Link to={`/mutual-fund/${item.schemeCode}`} key={item.schemeCode}>
                                    <div className="fund-lists">
                                        <p className="name ">{ item.schemeName}</p>
                                        <span className="scheme-code ">Scheme Code : {item.schemeCode}</span>
                                    </div>
                                </Link>
                            </>
                        })}
                    </div>
                </article>
            </main>
            
        </>
    );
};

export default Home;