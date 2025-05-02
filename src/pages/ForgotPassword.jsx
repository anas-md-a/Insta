import React, { useState } from 'react'
import { Button, Card, CardBody, Col, Form, FormControl, FormLabel, Row } from 'react-bootstrap'
import CustomButton from '../components/CustomButton'
import { useForm } from 'react-hook-form';
import ToastedMessage from '../components/ToastedMessage';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const navigate =  useNavigate();

    const form = useForm();

    const { register, handleSubmit, formState } = form

    const { errors } = formState

    const [validEmail, setValidEmail] = useState(false);
    const [showOtp, setShowOtp] = useState("");
    const [isDisable, setIsDisable] = useState(true)


   



    const onSubmit = async (d) => {

        
        try {

            const response = await axios.post(`http://localhost:8080/forgot-password?email=${d.email}`);
            if (response.status === 200) {
                setValidEmail(true);
                
                setShowOtp( response.data.randomOTP);

            } else {
                toast.error("Invalid email")
            }

        } catch (error) {
            toast.error("Invalid email")
            console.log(error.message);

        }

    }

    const verifyOtp = async(d) => {
        console.log(d)
        const enteredOtp = form.getValues("randomOTP");
        if (enteredOtp == showOtp) {
           

            try{
                const response = await axios.put(`http://localhost:8080/update-password?email=${d.email}&password=${d.password}`);
                if (response.status === 200) {

                    toast.success("OTP Verified and password changed");
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);

                } else {
                    toast.error("Password can't changed")
                }
    
            } catch (error) {
                toast.error("Password can't changed")
                console.log(error.message);
    
            }
        } else {
            toast.error("Invalid OTP");
        }
    }

    const [handlePass, setHandlePass] = useState('')
    const [password, setPassword] = useState('');

    const handlePassword = (e) => {
        setPassword(e.target.value);

        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (hasUpper && hasLower && hasNumber && hasSpecial) {
            setHandlePass(null);
            setIsDisable(false)

            if (password.length < 8) {
                setHandlePass("password length must be greater than 8 characters")
                setIsDisable(true)

            } else {
                setHandlePass(null)

            }
        }

        else {
            setHandlePass("password must 2 smallcase letter, 2 number, 1 Uppercase and 1 Sysmbol")
            setIsDisable(true)
        }
    }

    const [confirmPass, setConfirmPass] = useState('');
    const [confirmMsg, setConfirmMsg] = useState('')
    

    const handleConfirmPass = (e) => {
        setConfirmPass(e.target.value)
        setConfirmMsg ( password !== confirmPass
        ? 'Confirm password does not match' 
        : null)
    }

    


    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card className='m-5 col-lg-12' style={{ width: '30rem' }} >
                <CardBody>
                    <div className='m-3 align-items-center'>
                        <div>
                            {/* <h6>Find your email</h6> */}
                            <h6>Forgot Password</h6>
                        </div>

                        <div className='m-4'>
                            <Form onSubmit={handleSubmit(onSubmit)}>

                                <Row className='mb-3'>
                                    <Col md={12} xs={12}>
                                        {!validEmail ? (
                                            <>
                                                <FormLabel >Email </FormLabel>
                                                <FormControl type='email'  {...register('email', {
                                                    required: {
                                                        value: true, message: 'This Field is required'
                                                    }
                                                })}>
                                                </FormControl>

                                                <p className='error'>{errors.email?.message}</p>
                                            </>
                                        ) : (
                                            <div >
                                                <FormLabel >Enter OTP </FormLabel>
                                                <FormControl type='number'  {...register('randomOTP', {
                                                    required: {
                                                        value: true, message: 'This Field is required'
                                                    }
                                                })}>
                                                </FormControl>
                                                <p className='error'>{errors.randomOTP?.message}</p>

                                                <FormControl className='mt-4' value={showOtp} readOnly />


                                                <FormLabel className='mt-3'>New Password</FormLabel>
                                                <FormControl type='Password'  {...register('password', {
                                                    required: {
                                                        value: true, message: 'This Field is required'
                                                    }
                                                })}  onKeyUp={handlePassword}>
                                                   
                                                </FormControl>
                                                <p className='error'>{errors.password?.message}</p>
                                                <p className='error'>{handlePass}</p>

                                                <FormLabel className='mt-2'>Confirm Password </FormLabel>
                                                <FormControl type='Password'  {...register('confirmPassword', {
                                                    required: {
                                                        value: true, message: 'This Field is required'
                                                    }
                                                })} onKeyUp={handleConfirmPass}>
                                                </FormControl>
                                                <p className='error'>{errors.confirmPassword?.message}</p>
                                                <p className='error'> {confirmMsg} </p>

                                            </div>

                                        )}
                                    </Col>
                                </Row>

                                <Row className='mt-4'>

                                    {!validEmail ? (
                                        <Button type='submit'>
                                            Send OTP
                                        </Button>
                                    ) : (
                                        <Button type='button' onClick={handleSubmit(verifyOtp)} disabled={isDisable}>
                                            verify
                                        </Button>
                                    )

                                    }
                                </Row>

                            </Form>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <ToastedMessage />
        </div>
    )
}

export default ForgotPassword