import SchoolIcon from '@mui/icons-material/School';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Alert, AlertTitle, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useRegistrationMutation } from '../../features/auth/authApi';
import './auth.css';


const SignUp = () => { 
    const [passwordStatus, setPasswordStatus] = useState(false)  
    const [rePasswordStatus, setRePasswordStatus] = useState(false)  

    const navigate = useNavigate();
    const [isCheckBox, setCheckBox] =useState(false) 
    const [registration, {data: userData, error: responseError, isError }]= useRegistrationMutation();
    const [error, setError] = useState('')  
   

    console.log(passwordStatus)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handelCheckBox =()=>{
        if(isCheckBox === false){
            setCheckBox(true)
        }else{
            setCheckBox(false);
        } 
    }

    const onSubmit = async (data) => {   
         
        if(data?.password !== data?.confirmPassword){
            setError("Password No Match")
        }else{
          setError()
          await registration(data);
        } 
         
    
    }; 

    useEffect(() => { 
        if(userData?.status === "error"){     
            setError(userData?.message)
           }  
        
           if(responseError?.data?.message?.errors?.password?.message){
            setError(responseError?.data?.message?.errors?.password?.message)
           }

        if(userData?.status === 'success'){
         alert(`${userData?.user.email} Registration Success. Switching to Login User`)
         navigate('/login');
       }
      }, userData , error);
     

      const handelOnPassword = () => {
        setPasswordStatus(passwordStatus === false? true : false)
      }

      const handelOnRePassword = () => {
        setRePasswordStatus(rePasswordStatus === false? true : false)
      }

    return (
        <Fragment>
            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xxl-4 col-lg-5">
                            <div className="card">
                                <div
                                    className="card-header  text-center"
                                    style={{ background: '#F8F9FA' }}
                                >
                                    <Link to="/">
                                        <span>
                                            {/* <img
                                                style={{
                                                    width: '200px',
                                                    height: '60px',
                                                }}
                                                src="images/SKU-Market-Logo.svg"
                                                alt="logo"
                                                height="22"
                                            /> */}
                                            <SchoolIcon style={{color:"#475968", fontSize:"40px"}}/>
                                        </span>
                                    </Link>
                                </div>

                                <div className="card-body ">
                                    <div className="text-center w-85     m-auto">
                                        <h4 className="text-dark-50 text-center mt-0 fw-bold">
                                            Author Sign Up
                                        </h4>
                                        <p className="text-muted" style={{ marginTop: "-5px"}}>
                                          Create a new account, it takes less than a minute.{' '}
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-2 text-left">
                                            <label
                                                htmlFor="displayName"
                                                className="form-label m-0"
                                            >
                                                Full Name
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="displayName"
                                                placeholder="Enter your name"
                                                {...register('displayName', {
                                                    required:
                                                        'Name is required',
                                                })}
                                            />
                                        </div>

                                        <div className="mb-2 text-left">
                                            <label
                                                htmlFor="email"
                                                className="form-label m-0"
                                            >
                                                Email address
                                            </label>
                                            <input
                                                className="form-control"
                                                type="email"
                                                id="email"
                                                placeholder="Enter your email"
                                                {...register('email', {
                                                    required:
                                                        'Email is required',
                                                })}
                                            />
                                        </div>

                                        <div className="mb-2 text-left">
                                            <label
                                                htmlFor="password"
                                                className="form-label text-left m-0"
                                            >
                                                Password
                                            </label>
                                            <div className="input-group input-group-merge">
                                                <input
                                                 type={passwordStatus? "text": "password"}
                                                    id="password"
                                                    className="form-control"
                                                    placeholder="Enter your password"
                                                    {...register('password', {
                                                        required:
                                                            'Password is required',
                                                    })}
                                                />
                                                <div
                                                    className="input-group-text p-0" >
                                                  <Button onClick={handelOnPassword}><span className="password-eye">{passwordStatus ? <VisibilityOffIcon className='OnPassword'/> : <VisibilityIcon className='OnPassword' />}</span></Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-2 text-left">
                                            <label
                                                htmlFor="confirmPassword"
                                                className="form-label text-left m-0"
                                            >
                                              Re Password
                                            </label>
                                            <div className="input-group input-group-merge">
                                                <input
                                                    type={rePasswordStatus? "text": "password"}
                                                    id="confirmPassword"
                                                    className="form-control"
                                                    placeholder="Enter Re password"
                                                    {...register('confirmPassword', {
                                                        required:
                                                            'Password is required',
                                                    })}
                                                />
                                                <div
                                                    className="input-group-text p-0" 
                                                >
                                                     <Button onClick={handelOnRePassword}><span className="password-eye">{rePasswordStatus ? <VisibilityOffIcon className='OnPassword'/> : <VisibilityIcon className='OnPassword' />}</span></Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-2">
                                            <div className="form-check text-left">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="checkbox-signup"
                                                    onClick={handelCheckBox}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="checkbox-signup"
                                                >
                                                    I accept{' '}
                                                    <a
                                                        href="/"
                                                        className="text-muted"
                                                    >
                                                        Terms and Conditions
                                                    </a>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="mb-22 text-center">
                                            <button
                                                className="btn btn-primary"
                                                type="submit"
                                                disabled={isCheckBox === true? false: true}
                                                style={{
                                                    background: '#1560FF',
                                                }} 
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="row mt-0">
                                <div className="col-12 text-center">
                                    <p className="text-muted m-1">
                                        Already have account?{' '}
                                        <Link
                                            to="/login"
                                            className="text-muted ms-1"
                                        >
                                            <b>Log In</b>
                                        </Link>
                                    </p>
                                </div>
                            </div>

                            {
                                error && (
                                    <Alert severity="error">
                                      <AlertTitle> 
                                        <Typography pt={0.50} variant="body2" gutterBottom>
                                        <strong>Check</strong> - {error? error:''} 
                                        </Typography>
                                      </AlertTitle> 
                                    </Alert>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SignUp;
