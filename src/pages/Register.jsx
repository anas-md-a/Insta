import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Form, FormControl, FormLabel, FormSelect, Row } from 'react-bootstrap'
import CustomButton from '../components/CustomButton'
import { data, Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import ToastedMessage from '../components/ToastedMessage'


const Register = ({ fromAdmin = false, loginRedirect = true, confirmPassword = true, passwordShow = true, contentForRegister= 'Create your account',isEdit=false, cardWidth, defaultValues = {}, RegisterFormButtonName='Register' , onSubmitHandler, onSuccess}) => {

    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [handlePass, setHandlePass] = useState('')
    const [phone, setPhone] = useState('')
    const [handleNo, setHandleNo] = useState('')
    // const [isdisabled, setIsdisabled] = useState(false);
    const [internalError, setinternalError] = useState(null);

    const handlePhone = (e) => {
        setPhone(e.target.value);

        // console.log(phone.length)

        if (phone.length === 9) {
            setHandleNo(null)
        }
        else {
            setHandleNo('Invalid number')
        }


    }

    const handlePassword = (e) => {
        setPassword(e.target.value);

        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (hasUpper && hasLower && hasNumber && hasSpecial) {
            setHandlePass(null);

            if (password.length < 8) {
                setHandlePass("password length must be greater than 8 characters")

            } else {
                setHandlePass(null)
            }
        }

        else {
            setHandlePass("password must 2 smallcase letter, 2 number, 1 Uppercase and 1 Sysmbol")
        }
    }

    const handleConfirmPass = (e) => {
        setConfirmPass(e.target.value)
    }





    // useEffect(() => {
    //     if (password !== confirmPass) {
    //         //setIsdisabled(password && confirmPass)
    //     }
    // }, [password, confirmPass])

    const confirmMsg = password !== confirmPass
        ? 'Confirm password does not match'
        : null

    const form = useForm({
        defaultValues : defaultValues
    });

    const { register, handleSubmit, formState } = form

    const { errors } = formState

    const navigate = useNavigate();

    var internal = false;



    const onSubmit = async (d) => {

        console.log(d)
        localStorage.setItem('email', d.email);

        if (fromAdmin) {
            d.isAdmin = d.isAdmin === "true";
            sessionStorage.setItem("userType", d.isAdmin);
        }

        // d.isAdmin = d.isAdmin === "true";

        const userType = sessionStorage.getItem("userType");

        // console.log(userType)



        try {
            const response = await fetch("http://localhost:8080/register"
                , {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(d)
                }
            )

            const data = await response.json();
            //   console.log(data);
            //   if (response.status === 500 ) {
            //     setinternalError('Email or phone is already used.');
            //     toast.error("Email or phone number already registered!");
            //     return;
            // }

            if (response.status === 409 || !data.success) {
                setinternalError(data.message || 'Email or phone is already used.');
                toast.error(data.message || "Email or phone number already registered!");
                return;
            }

            toast.success(data.message || "Registration successful!");
            
            localStorage.setItem('customerId', data.customerId);

            setTimeout(() => {
                if (!internal) {
                    if (onSuccess) {
                        onSuccess(); // Close modal register model in admin
                    }
            
                    if (d.isAdmin) {
                        navigate('/adminPage');
                    } else {
                        navigate('/home');
                    }
                }else {
                    navigate("/register")
                }
            }, 1500);
            
            
        }

        catch (error) {


            console.log(error.message);
            toast.error("Registration failed. Please try again.");
        }


    }



    return (
        <div className="d-flex justify-content-center align-items-center" >
            <Card className='m-5' style={{ width: cardWidth || '60%' }} >
                <CardBody>
                    <div className='m-3 align-items-center'>
                        <div>

                            <h3 className='my-2'>
                                { isEdit ? "Edit an account" : contentForRegister }
                            </h3>
                            <span>
                                {isEdit ? "Update the details" :
                                    
                                     'Enter your details below to create your account'}
                            </span>

                        </div>

                        <div className='m-4'>
                            <Form onSubmit={handleSubmit(data =>{
                                if(onSubmitHandler){
                                    onSubmitHandler(data);
                                }else{
                                    onSubmit(data);
                                }
                            }

                            )}>
                                <p className='error'>{internalError}</p>
                                <Row className='mb-3'>
                                    <Col xs={12} md={4}>

                                        <FormLabel >Full name*</FormLabel> 
                                        <FormControl type='text' placeholder='Enter name' {...register('name', {
                                            required: {
                                                value: true, message: 'Your name is required'
                                            }
                                        })}></FormControl>
                                        <p className='error'>{errors.name?.message}</p>

                                    </Col>
                                    <Col xs={12}  md={4}>
                                        <FormLabel>Email*</FormLabel>
                                        <FormControl type='text' placeholder='Enter email' {...register('email', {
                                            required: {
                                                value: true, message: 'Your email is required'
                                            }
                                        })}>

                                        </FormControl>
                                        <p className='error'>{errors.email?.message}</p>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <FormLabel>Phone number*</FormLabel>
                                        <FormControl type='number' placeholder='Enter your number' {...register('phone', {
                                            required: {
                                                value: true, message: 'Your phone is required'
                                            }
                                        })} onKeyUp={handlePhone}>

                                        </FormControl>
                                        <p className='error'>{errors.phone?.message}</p>
                                        <p className='error'>{handleNo}</p>

                                    </Col>
                                </Row>
                               



                                <Row className='mb-3'>

                                    {passwordShow && (
                                        <>
                                            <Col xs={12} md={6}>
                                                <FormLabel>Password*</FormLabel>
                                                <FormControl type='password' placeholder='Enter your password' {...register('password', {
                                                    required: {
                                                        value: true, message: 'Your password is required'
                                                    }
                                                })} onKeyUp={handlePassword}>

                                                </FormControl>
                                                <p className='error'>{errors.password?.message}</p>
                                                <p className='error'>{handlePass}</p>
                                            </Col>
                                        </>
                                    )

                                    }



                                    {confirmPassword && (
                                        <>
                                            <Col xs={12} md={6}>
                                                <FormLabel>Confirm password*</FormLabel>
                                                <FormControl type='password' placeholder='Enter your confirm password' {...register('confirmPass', {
                                                    required: {
                                                        value: true, message: 'Your confirm password is required'
                                                    }
                                                })} onKeyUp={handleConfirmPass}>

                                                </FormControl>
                                                <p className='error'>{errors.confirmPass?.message}</p>
                                                <p className='error'> {confirmMsg} </p>
                                            </Col>
                                        </>

                                    )
                                    }




                                </Row>

                               

                                {/* {
                                    passwordShow && (
                                        <>
                                           
                                            <Row className='mb-3'>
                                                
                                            </Row>
                                        </>
                                    )

                                }
                                {
                                    confirmPassword && (
                                        <>
                                            <Row>
                                                <FormLabel>Confirm Password</FormLabel>
                                            </Row>
                                            <Row className='mb-2'>
                                                

                                            </Row>
                                        </>
                                    )
                                } */}
                                {/* <Row>
                                    <FormLabel>ID Type</FormLabel>
                                </Row> */}
                                {/* <Row className='mb-2'>
                                    <FormSelect  {...register('isAdmin')}>

                                        <option value= {false} >User</option>
                                        <option value={true}>Admin</option>

                                    </FormSelect>
                                </Row> */}

                                {/* <FormControl type='hidden' value= {false} {...register('isAdmin')}></FormControl> */}

                                {
                                    fromAdmin && (
                                        <>

                                            {/* <Row className=''>
                                                <FormSelect {...register('isAdmin')} defaultValue="false">
                                                    <option value="false">User</option>
                                                    <option value="true">Admin</option>
                                                </FormSelect>
                                            </Row> */}

                                            <FormControl type='hidden' value={fromAdmin} {...register('isAdmin')}></FormControl>

                                        </>
                                    )
                                }

                                <Row className='mt-4'>
                                  
                                   <Button  type='submit' className='justify-content-center align-items-center'>
                                        {RegisterFormButtonName}
                                    </Button>
                                  
                                </Row>
                                {
                                    loginRedirect && (
                                        <Row >
                                            <p className='text-center my-3'> Already have an account? <Link to="/" className='text-decoration-none'>Login</Link></p>
                                        </Row>
                                    )
                                }
                            </Form>
                        </div>
                    </div>
                </CardBody>

            </Card>

            <ToastedMessage />

        </div>
    )
}

export default Register
