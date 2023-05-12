import { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash';
import { useForm } from 'react-hook-form';
import { yupResolver }  from '@hookform/resolvers/yup';
import Header from '../../components/header.jsx';
import { Lable} from '../../components/formElement.jsx';
import { useNavigate  } from 'react-router-dom';
import { httpPut } from '../../utils/functions.js';

import { schemaUserEdit} from '../../utils/validationSchemas.js';

let EditForm = () => {
    const user = useSelector(state => state.user);
    const [isError, setIsError] = useState(false)
    const [load, setLoad] = useState(false)
    const [currentRadioValue, setCurrentRadioValue] = useState('Male')
    const navigate = useNavigate()
    const { register, handleSubmit, formState: {errors} , setValue} = useForm({
        resolver : yupResolver(schemaUserEdit),
    });

    const handleRadioChange = (e) => {
        setCurrentRadioValue(e.target.value);
      };
    const submit = (data) => {
        const crt_req_data = { 
            first_name:data.fname,
            last_name:data.sname,
            dob:data.dob,
            gender:currentRadioValue
         };
         httpPut('/api/v1/profile',crt_req_data,function (res) {
             if(res.data.status_code===200) {
                 setLoad(false)
                return navigate("/user/success/edit")
             }
             setIsError(true)
         })
  	}
      useEffect(() => {
        if(user?.id){
            setValue('fname', user?.first_name);
            setValue('sname', user?.last_name)
            setValue('email', user?.email)
            setValue('phone', user?.phone_number)
            setValue('dob', user?.dob)
            setCurrentRadioValue(user.gender)
        }
    }, [])
    return (
        <>
        <Header/>
            <div className="container-fluid row">
                <div className='col-md-6 offset-md-3 mt-5'>
                <h3 className='text-white'>Update Account</h3>
                <form onSubmit={handleSubmit(submit)} className="fs-13px bg-white p-3 rounded-3 p-2">
                <h2 className='text-center'>ABC COMPANY</h2>

                <div className="row">
                    <div className=" mb-3 col-md-6">
                    <Lable name="First Name"/>
                        <input type="text" {...register("fname")} className={`form-control h-45px fs-13px ${_.isEmpty(errors) ?  '' : errors?.fname ? 'is-invalid' : 'is-valid'}`} placeholder="Username" id="fname"  />
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
                    <Lable name="Date of birth"/>
                        <input type="date" {...register("dob")} className={`form-control h-45px fs-13px ${_.isEmpty(errors) ?  '' : errors?.dob ? 'is-invalid' : 'is-valid'}`} placeholder="Date of Birth" id="dob" />
                        {
                            errors?.dob?.message ? <div className="invalid-feedback">{errors?.dob?.message}</div> : null
                        }
                    </div>

                    <div className=" mb-3 col-md-12">
                    <input
                        id="radio-item-1"
                        name="radio-item-1"
                        type="radio"
                        value="male"
                        onChange={handleRadioChange}
                        checked={currentRadioValue === 'male'}
                        />
                            <label htmlFor="radio-item-1"> Male</label>
                        </div>
                        <div className=" mb-3 col-md-12">
                            <input
                            id="radio-item-2"
                            name="radio-item-2"
                            type="radio"
                            value="female"
                            onChange={handleRadioChange}
                            checked={currentRadioValue === 'female'}
                            />
                            <label htmlFor="radio-item-2">
                             Female
                            </label>
                    </div>
                    <div className=" mb-3 col-md-12">
                            <input
                            id="radio-item-2"
                            name="radio-item-2"
                            type="radio"
                            value="other"
                            onChange={handleRadioChange}
                            checked={currentRadioValue === 'other'}
                            />
                            <label htmlFor="radio-item-2">
                            Other
                            </label>
                    </div>
                    <div className={` mb-3`}>
                        {
                            isError ? <div style={{color: 'red'}}>Registration failed try again later</div> : null
                        }
                    </div>
                    <div className="mb-15px">
                        <button type="submit" className="btn btn-primary d-block h-45px w-100 btn-lg fs-14px" disabled={load}>{load?'Processing...':'Update'}</button>
                    </div>

                </form>
                </div>
            </div>
        </>
    )
}

export default EditForm;