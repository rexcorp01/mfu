import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { getAll } from '../services';
import _ from 'lodash';
import { useForm } from "react-hook-form";


const Home = () => {
    const searchInput = useRef();
    const userState = useSelector((state) => state);
    const [listOfMf, setListOfMf] = useState(null);
    const [completeList, setCompleteList] = useState(null);
    const [searchList, setSearchList] = useState(null);
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    
    useEffect(() => {
        if (userState.userState === null) {
            navigate('/login');
        }
    }, [userState.userState]);

    useEffect(() => {
        const data = getAll('https://api.mfapi.in/mf')
            .then((data) => {
                // console.log(data)
                data && setListOfMf(data.slice(0, 5));
                data && setCompleteList(data);
            });
    }, []);
    
    const getSearchIems = () => {
        console.log(searchInput.current.value)
        
            // let value = e.target.value.toLowerCase();
            let value = searchInput.current.value.toLowerCase();
            let filteredList = completeList.filter(detail => {
                // return detail.schemeName.search(new RegExp(value, "i"))
                return detail.schemeName.toLowerCase().includes(value);
            });
            setSearchList(filteredList);
            console.log(filteredList)
        
  
    };
    const onSubmit = data => getSearchIems();

    const showUrl = (code) => {
        setSearchList(null);
    };
    return (
        <>
            <main>
                <article>
                    <div className="container mt-5 mb-5">
                        <div className="search-block">
                            <div className="input-block">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input type="text" ref={searchInput}  className="form-control" onBlur={() => setSearchList(null)} />
                                    <div className="seach-icon" onClick={getSearchIems}>
                                        {<SearchIcon />}
                                    </div>
                                </form>
                            </div>{
                                searchList && <>
                                    <div className="search-content">
                                        <div className="close-btn"><button className="btn" type="button" onClick={() => setSearchList(null)}>x</button></div>
                                        <ul className="list-unstyled">
                                            {searchList && searchList.map((item) => {
                                                return <>
                                                    <li key={item.schemeCode + 'list'} onClick={() => showUrl(item.schemeCode)}>{ item.schemeName}</li>
                                                </>
                                            })}
                                        </ul>
                                    </div>
                                </>
                            }
                            
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

const SearchIcon = () => {
    return <>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
    </>
}