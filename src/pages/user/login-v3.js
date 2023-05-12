import React, { useContext, useState, useEffect } from 'react';
import { Link, Navigate,Redirect } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../utils/variables';
// import { AppSettings } from '../../../config/app-settings.js';

import LoginForm from './loginForm.jsx';
import UserAuth from './userAuth.jsx';

const LoginV3  = () => {
	
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		const token=JSON.parse(localStorage.getItem('token'));
		axios.get(`${API}/api/v1/auth/user`, {
			headers: {
			  Authorization: 'Bearer ' + token //the token is a variable which holds the token
			}
		   })
		.then(response =>{
			if(response?.data.status_code===200){
				setRedirect(true)
			}
		}).catch(res=>{
			console.log(res);
		});

	}, [])
  
	return	(
		<>
		{
			redirect ?  <Navigate replace to="/user/show" />: <LoginForm setSuccess={setRedirect} />
		}					
		</>
		)
}

export default LoginV3;