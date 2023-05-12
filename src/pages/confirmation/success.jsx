import _ from 'lodash';
import { Link , useParams } from 'react-router-dom'
import { useNavigate  } from 'react-router-dom';
let LoginForm = () => {
    const navigate = useNavigate()

    const params = useParams();
    return (
        <>
            <div className="container-fluid row">
                <div className='col-md-4 offset-md-4 mt-5'>
                <div className="fs-13px bg-white p-3 rounded-3 p-2 text-center">
                <img src='../../img/success.png' width="100" height='100' className='mb-4'></img>
                        <h3 className='mb-4'>Congratulation</h3> 
                        <h5 className='mb-4'>Your Account has been {params.location==='edit' ? 'Updated':'Created'} Successfully</h5>
                        <div className="mb-15px">
                        <Link to={params.location==='edit' ? '/user/show':'/'} className="btn btn-primary d-block h-45px w-100 btn-lg fs-12px fw-800">
                            <b>Go to {params.location==='edit' ? 'Profile view':'Login'}</b>
                        </Link>
                      </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm;