import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { setUserState } from '../actions';

const Profile = () => {
    const userState = useSelector((state) => state);
    const [profileDetails, setProfileDetails] = useState(null);
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const changeEditMode = () => {
        setEditMode(!editMode);
    }
    const onSubmit = data => {
        
        localStorage.setItem('user', JSON.stringify({user: data}))
        dispatch(setUserState());
        alert('Details updated Successfully');
        setEditMode(!editMode);
        // navigate('/');
    };
     useEffect(() => {
        if (userState.userState == null) {
            navigate('/login');
            return;
         }
         setProfileDetails(userState.userState.user);
    }, [userState.userState])
    return (
        <div className="container">
            {/* {JSON.stringify(profileDetails)} */}
            <div className="col-md-6 ms-auto me-auto">

                <div className="form-container">
                    <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
                        <h3 className="h3 mb-5">Profile</h3>
                        <div className="edit-btn-container">
                            <button type="button" className="btn" onClick={() => {changeEditMode()}} disabled={editMode}>Edit Profile</button>
                        </div>
                        <div className="input-col col-10 col-md-10">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input defaultValue={userState.userState && userState.userState.user.name} placeholder="Enter your name" {...register("name", { required: true })} type="text" className="form-control" id="name" readOnly={ !editMode}/>
                            {errors.name && <span className="error">This field is required</span>}
                            
                        </div>
                        <div className="input-col col-10 col-md-10">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input defaultValue={userState.userState && userState.userState.user.email} placeholder="Enter your email" {...register("email", { required: true })} type="email" className="form-control" id="email" readOnly={ !editMode}/>
                            {errors.email && <span className="error">This field is required</span>}
                            
                        </div>
                        {/* <div className="input-col col-md-10">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input defaultValue={userState.userState && userState.userState.user.password} placeholder="Enter your password" {...register("password", { required: true, pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/})} type="password" className="form-control" id="password" readOnly={ !editMode} disabled/>
                            {(errors.password && errors.password.type === 'required') && <span className="error">This field is required</span>}
                            {(errors.password && errors.password.type === 'pattern') && <span className="error">Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters (eg: </span>}
                        </div> */}
                        
                        <div className="input-col col-10 col-md-10">
                            <label htmlFor="gender" className="form-label">Select Gender</label>
                            <select {...register("gender")} className="form-control" id="gender" disabled={ !editMode}>
                                <option value="female" selected={userState.userState && userState.userState.user.gender == 'female'}>Female</option>
                                <option value="male" selected={userState.userState && userState.userState.user.gender == 'male'}>Male</option>
                                <option value="other" selected={userState.userState && userState.userState.user.gender == 'other'}>other</option>
                            </select>
                        </div>
                        <div className="input-col col-10 col-md-10">
                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                            <input defaultValue={userState.userState && userState.userState.user.dob} placeholder="Enter your dob" {...register("dob", { required: true })} type="date" className="form-control" id="dob" onFocus={ (e) => {}} readOnly={ !editMode}/>
                            {errors.dob && <span className="error">This field is required</span>}
                            
                        </div>
                        
                        
                        <button className="btn login-btn" type='submit' disabled={!editMode}>Update Changes</button>
                    </form>
                </div>
            </div>
            
        </div>
    );
};

export default Profile;