import { useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect,useState } from 'react';
import _ from 'lodash';
import Header from '../../components/header';
import { setUser} from '../../reducers/UserReducer.ts';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import { imgCheck} from '../../utils/validationSchemas.js';
import { yupResolver }  from '@hookform/resolvers/yup';
import { httpPost,httpGet } from '../../utils/functions.js';

let UserAuth = () => {
    const [show, setShow] = useState(false);
    const [load, setLoad] = useState(false)
    const [isError, setIsError] = useState(false)
    const handleClose = () => setShow(false);
    const navigate = useNavigate()
    const [image, setImage] = useState(null)

    const onImageChange = (event) => {
     if (event.target.files && event.target.files[0]) {
       setImage(URL.createObjectURL(event.target.files[0]));
     }
    }

    const token = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const [ user, setUserState ] = useState({})
    	useEffect(() => {
            httpGet('/api/v1/profile',function (res) {
                    setUserState(res.data.result);
                    dispatch(setUser(res.data.result))
            })
	}, [])


    const { register, handleSubmit, formState: {errors},getValues } = useForm({
        resolver : yupResolver(imgCheck),
    });

    const submit = (data) => {
        setLoad(true)
        const formData = new FormData();
        formData.append("profile_image", data.profile_image[0]);
        httpPost('/api/v1/profile/avatar',formData,function (res) {
            if(res?.data?.status_code===200) {
               return navigate("/user/success/edit")
            }
            setIsError(true)
            setLoad(false)
        })
      }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>Upload Avatar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="fs-13px bg-white p-3 rounded-3 p-2" onSubmit={handleSubmit(submit)} encType='multipart/form-data'>
                            <div className="mb-3 col-md-6 offset-md-2">
                                <img alt="preview image img-cover" src={image} width="200px"/>
                                <input type="file" {...register("profile_image")} className={`form-control h-45px fs-13px ${_.isEmpty(errors) ?  '' : errors?.profile_image ? 'is-invalid' : 'is-valid'}`} placeholder="File" id="profile_image"  onChange={onImageChange}/>
                                {
                                    errors?.profile_image?.message ? <div className="invalid-feedback">{errors?.profile_image?.message}</div> : null
                                }
                            </div>
                            {
                                isError ? <div style={{color: 'red'}}>Upload failed try again later</div> : null
                            }
                            <div className="mb-15px ">
                                <button type="submit" className="btn btn-primary h-25px w-20 btn-lg fs-14px" disabled={load}>{load?'Processing...':'Upload'}</button>
                            </div>
                            <div className={` mb-3`}>
                    </div>
                </form>
                </Modal.Body>
            </Modal>


        <Header/>
            <div className="container-fluid bg-light p-5">
                <div className='row mt-4'>
                    <div className='col-md-4 offset-md-4'>
                <div className="row">
                <div className='row mb-4 '>
                        <div className='col-md-4 weight-800'>
                            <img src={user?.profile_image?.thumb} width="100" height='100'></img><br/>
                            <button className='btn btn-sm btn-warning' onClick={()=>setShow(true)}>change</button>
                        </div>
                        <div className='col-md-8 text-right'> <h5>Welcome</h5>
                        <h2>{user.name}</h2>
                        
                        </div>
                    </div>
                    <div className='row mb-4'>
                        <div className='col-md-6 fw-800'>Email Adress</div>
                        <div className='col-md-6 text-right'> {user?.email}</div>
                    </div>
                    <div className='row mb-4'>
                        <div className='col-md-6 fw-800'>Name</div>
                        <div className='col-md-6 text-right'> {user?.name}</div>
                    </div>
                    <div className='row mb-4'>
                        <div className='col-md-6 fw-800'>Gender</div>
                        <div className='col-md-6 text-right'> {user.gender?user.gender:'N/A'}</div>
                    </div>
                    <div className='row mb-4'>
                        <div className='col-md-6 fw-800'>Date Of Birth</div>
                        <div className='col-md-6 text-right'> {user?.dob || 'N/A'}</div>
                    </div>                   
                </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default UserAuth;