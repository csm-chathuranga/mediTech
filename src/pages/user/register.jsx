import { useState } from 'react';
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { yupResolver }  from '@hookform/resolvers/yup';
import axios from 'axios';
import { Lable } from '../../components/formElement.jsx';
import { API } from '../../utils/variables';
import { useNavigate  } from 'react-router-dom';
import { schemaUser } from '../../utils/validationSchemas.js';
import Header from '../../components/header.jsx';
import { httpPostRegister } from '../../utils/functions.js';


let RegisterForm = () => {
    const [isError, setIsError] = useState(false)
    const [load, setLoad] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver : yupResolver(schemaUser),
    });

    const submit = (data) => {
        setLoad(true)
        const crt_req_data = { 
            email: data.email,
            first_name:data.fname,
            last_name:data.sname,
            password:data.password,
            confirm_password:data.cpassword,
            mobile_number:data.phone,
            dob:data.dob
         };
         httpPostRegister('/api/v1/register',crt_req_data,function (res) {
            if(res?.data?.status_code===200) {
                if(res.data.status_code==200) return navigate("/user/success/login")
            }
            setIsError(true)
            setLoad(false)
        })
  	}

    return (
        <>
        <Header/>
            <div className="container-fluid row">
                <div className='col-md-6 offset-md-3 mt-5'>
                <h3 className='text-white'>Create Account</h3>
                <form onSubmit={handleSubmit(submit)} className="fs-13px bg-white p-3 rounded-3 p-2">
                <h2 className='text-center'>ABC COMPANY</h2>

                <div className="row">
                    <div className=" mb-3 col-md-6">
                    <Lable name="First Name"/>
                        <input type="text" {...register("fname")} className={`form-control h-45px fs-13px ${_.isEmpty(errors) ?  '' : errors?.fname ? 'is-invalid' : 'is-valid'}`} placeholder="First Name" id="fname"  />
                        {
                            errors?.fname?.message ? <div className="invalid-feedback">{errors?.fname?.message}</div> : null
                        }
                    </div>

                    <div className=" mb-3 col-md-6">
                    <Lable name="Second Name"/>
                        <input type="text" {...register("sname")} className={`form-control h-45px fs-13px ${_.isEmpty(errors) ?  '' : errors?.sname ? 'is-invalid' : 'is-valid'}`} placeholder="Second Name" id="sname" />
                        {
                            errors?.sname?.message ? <div className="invalid-feedback">{errors?.sname?.message}</div> : null
                        }
                    </div>
                    </div>

                    <div className=" mb-3 col-md-12">
                    <Lable name="Email Address"/>
                        <input type="text" {...register("email")} className={`form-control h-45px fs-13px ${_.isEmpty(errors) ?  '' : errors?.email ? 'is-invalid' : 'is-valid'}`} placeholder="Email Address" id="lname" />
                        {
                            errors?.email?.message ? <div className="invalid-feedback">{errors?.email?.message}</div> : null
                        }
                    </div>

                    <div className=" mb-3 col-md-12">
                    <Lable name="Date of birth"/>
                        <input type="date" {...register("dob")} className={`form-control h-45px fs-13px ${_.isEmpty(errors) ?  '' : errors?.dob ? 'is-invalid' : 'is-valid'}`} placeholder="Date of Birth" id="dob" />
                        {
                            errors?.dob?.message ? <div className="invalid-feedback">{errors?.dob?.message}</div> : null
                        }
                    </div>

                    <div className=" mb-3 col-md-12">
                    <Lable name="Phone Number"/>
                        <input type="number" {...register("phone")} className={`form-control h-45px fs-13px ${_.isEmpty(errors) ?  '' : errors?.phone ? 'is-invalid' : 'is-valid'}`} placeholder="phone Number" id="lname" />
                        {
                            errors?.phone?.message ? <div className="invalid-feedback">{errors?.phone?.message}</div> : null
                        }
                    </div>

                    <div className=" mb-3 col-md-12">
                    <Lable name="Password"/>
                            <input type="password" {...register("password")} className={`form-control h-45px fs-13px ${_.isEmpty(errors) ?  '' : errors?.password ? 'is-invalid' : 'is-valid'}`} placeholder="Password" id="password" />
                            {
                                errors?.password?.message ? <div className="invalid-feedback">{errors?.password?.message}</div> : null
                            }
                    </div>

                    <div className=" mb-3 col-md-12">
                    <Lable name="Confirm Password"/>
                            <input type="password" {...register("cpassword")} className={`form-control h-45px fs-13px ${_.isEmpty(errors) ?  '' : errors?.cpassword ? 'is-invalid' : 'is-valid'}`} placeholder="Confirm Password" id="cpassword" />
                            {
                                errors?.cpassword?.message ? <div className="invalid-feedback">{errors?.cpassword?.message}</div> : null
                            }
                    </div>

                    <div className={` mb-3`}>
                        {
                            isError ? <div style={{color: 'red'}}>Email Address Already exist</div> : null
                        }
                    </div>

                    <div className="mb-15px">
                        <button type="submit" className="btn btn-primary d-block h-45px w-100 btn-lg fs-14px" disabled={load}>{load?'Processing...':'Register'}</button>
                    </div>
                <div className="text-gray-600 text-left text-gray-500-darker mb-0 mt-3">
                        Already Have An Account ? <a href='/'>LOGIN NOW</a>
                    </div>

                </form>
                </div>
            </div>
        </>
    )
}

export default RegisterForm;