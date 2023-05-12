import { useEffect } from 'react';
import {  useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { flushAuth } from '../../reducers/AuthReducer.ts';
import { Link  } from 'react-router-dom'
import { flushUser} from '../../reducers/UserReducer.ts';

let LoginForm = () => {
    const dispatch = useDispatch()
    useEffect(() => {
		dispatch(flushAuth())
		dispatch(flushUser())
        localStorage.removeItem('token')
    }, [])
    return (
        <>
            <div className="container-fluid row">
                <div className='col-md-4 offset-md-4 mt-5'>
                <div className="fs-13px bg-white p-3 rounded-3 p-2 text-center">
                <img src='../../img/success.png' width="100" height='100' className='mb-4'></img>
                        <h5 className='mb-4'>You have been logged out</h5>
                        <div className="mb-15px">
                        <Link to='/' className="btn btn-primary d-block h-45px w-100 btn-lg fs-12px fw-800">
                            <b>Login</b>
                        </Link>  
                        </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm;