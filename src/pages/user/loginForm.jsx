import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { useNavigate,redirect  } from 'react-router-dom';
import { yupResolver }  from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { setAuth } from '../../reducers/AuthReducer.ts';
import { API } from '../../utils/variables';
import Header from '../../components/header.jsx';
import { schemaLogin } from '../../utils/validationSchemas.js';

let LoginForm = ({setSuccess}) => {

    const [isError, setIsError] = useState(false)
    const [load, setLoad] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver : yupResolver(schemaLogin),
    });

    const submit = (data) => {
        setLoad(true)
        const crt_req_data = { 
            username: data.username,
            password:data.password,
            client_id:'4',
            client_secret:'sfQfhp6tDeGvEp7ZhVwk0MjbpaP55tJ1oJAKuZAE',
            grant_type:'password',
         };
        axios.post(`${API}/oauth/token`, crt_req_data)
        .then(response =>{
                    setLoad(false)
                    setIsError(false)
                    setSuccess(true);
                    dispatch(setAuth(response.data.access_token))
                    localStorage.setItem('token',JSON.stringify(response.data.access_token))
                    // navigate('/user/show')
        }).catch(res=>{
            setLoad(false)
            setIsError(true)
        });
  	}

    return (
        <>
        <Header/>
            <div className="container-fluid row">
                <div className='col-md-4 offset-md-4 mt-5'>
                <h3 className='text-white'>Welcome Back</h3>
                <p className='text-white'>Login to your Acoount</p>
                <form onSubmit={handleSubmit(submit)} className="fs-13px bg-white p-3 rounded-3 p-2">
                <h2 className='text-center'>ABC COMPANY</h2>
                    <div className="form-floating mb-3">
                        
                        <input type="text" {...register("username")} className={`form-control h-45px fs-13px ${_.isEmpty(errors) ?  '' : errors?.username ? 'is-invalid' : 'is-valid'}`} placeholder="Username" id="username" />
                        <label htmlFor="username" className="d-flex align-items-center fs-13px text-gray-600">Username</label>
                        {
                            errors?.username?.message ? <div className="invalid-feedback">{errors?.username?.message}</div> : null
                        }
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" {...register("password")} className={`form-control h-45px fs-13px ${_.isEmpty(errors) ?  '' : errors?.password ? 'is-invalid' : 'is-valid'}`} placeholder="Password" id="password" />
                        <label htmlFor="password" className="d-flex align-items-center fs-13px text-gray-600">Password</label>
                        {
                            errors?.password?.message ? <div className="invalid-feedback">{errors?.password?.message}</div> : null
                        }
                    </div>
                    <div className={`form-floating mb-3`}>
                        {
                            isError ? <div style={{color: 'red'}}>Username Or Password Is Incorrect</div> : null
                        }
                    </div>
                    <div className="mb-15px">
                        <button type="submit" className='btn btn-primary d-block h-45px w-100 btn-lg fs-12px' disabled={load}>{load?'Processing...':'LOGIN'}</button>
                    </div>
                    <hr className="bg-gray-600 opacity-2" />
                    <div className="text-gray-600 text-left text-gray-500-darker mb-0">
                        Still Have No Account ? <a href='user/register'>SIGNUP NOW</a>
                    </div>
                </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm;