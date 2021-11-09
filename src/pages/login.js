import React from 'react';
import { useForm } from "react-hook-form";
import '../styles/login.css'
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserState } from '../actions';


const Login = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const user = {"user":{"name":"Suman Nunia","email":"nuniasuman55@gmail.com","password":"Admin@12345","gender":"male","dob":"1996-01-09"}}
    const onSubmit = data => {
        localStorage.setItem('user', JSON.stringify(user))
        dispatch(setUserState());
        navigate('/');
    };
    return (
        <main>
            <div className="container">
                <div className="col-md-6 ms-auto me-auto">
                    <div className="form-container">
                        
                        <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
                            <h3 className="h3 mb-5">Login to Mutual Fund</h3>
                            <div className="input-col col-10 col-md-10">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input defaultValue="" placeholder="Enter your email" {...register("email", { required: true })} type="email" className="form-control" id="email" />
                                {errors.email && <span className="error">This field is required</span>}
                                
                            </div>
                            <div className="input-col col-10 col-md-10">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input defaultValue="" placeholder="Enter your password" {...register("password", { required: true, pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/})} type="password" className="form-control" id="password" />
                                {(errors.password && errors.password.type === 'required') && <span className="error">This field is required</span>}
                                {(errors.password && errors.password.type === 'pattern') && <span className="error">Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters (eg: </span>}
                            </div>
                            
                            
                            <button className="btn login-btn" type='submit'>Login</button>
                            <div className="new-user mt-5"><Link to="/signup">New user? Sign Up</Link></div>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default Login;