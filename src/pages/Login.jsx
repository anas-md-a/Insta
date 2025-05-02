import React, { useEffect, useState } from 'react'
import { Card, CardBody, Col, Form, FormCheck, FormControl, FormLabel, Row } from 'react-bootstrap'
import CustomButton from '../components/CustomButton'
import { Link, Links, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import ToastedMessage from '../components/ToastedMessage'

const Login = () => {

    const navigate = useNavigate();

    const form = useForm();

    const { register, handleSubmit, formState } = form

    const { errors } = formState
    const [error, setError] = useState(null);


    const onSubmit = async (d) => {
        console.log(d);

        setError(null);

        // let saveCookie = false;
        // if(d.rememberMe){
        //     saveCookie = true
        // }



        try {
            const response = await fetch(`http://localhost:8080/login?email=${d.email}&password=${d.password}`
                , {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(d)
                }
            )

            const data = await response.json();

            console.log(data)

           

            // if (Array.isArray(data) && data.length > 0) {
            //     data.map((userdata) => {
            //         console.log(userdata);
            //         localStorage.setItem('customerId', userdata.customerId);
            //         localStorage.setItem('name', userdata.name);
            //         localStorage.setItem('email', userdata.email);

            //         toast.success('Login successfully!');
            //         setTimeout(() => {
            //             if (userdata.isAdmin) {
            //               navigate("/adminPage");
            //             } else {
            //               navigate("/home");
            //             }
            //           }, 1500); 

            //     })

            // } else {

            //     setError("you entered a wrong details")
            //     toast.error('Invalid email or password');
            // }


            if (data.success) {
                const user = data.user;

                // console.log(saveCookie);
                

                // customer id, cookie value, expiry data
                // if(saveCookie){
                //     const setCookie = (cname, cvalue, exdays) => {
                //         const cookieDate = new Date();
                //         cookieDate.setTime(cookieDate.getTime() + (exdays*24*60*60*1000) );
                //         let expires = "expires" + cookieDate.toUTCString;
                //         document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
                //         cookie.setItem()
                //     }
                // }

                // Save user info
                localStorage.setItem('customerId', user.customerId);
                localStorage.setItem('name', user.name);
                localStorage.setItem('email', user.email);

                toast.success(data.message);
                setTimeout(() => {
                    if (user.isAdmin) {
                        navigate("/adminPage");
                    } else {
                        navigate("/home");
                    }
                }, 1500);
            } else {
                // setError(data.message);
                toast.error(data.message);
            }



        } catch (err) {
            toast.error('Failed to login. Please try again later.');
            console.log(err.message)
        }





    }



    // useEffect(() => {
    //     value()
    //   }, [])








    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card className='m-5 col-lg-12' style={{ width: '30rem' }} >
                <CardBody>
                    <div className='m-3 align-items-center'>
                        <div>
                            <h3>Login</h3>
                        </div>

                        <div className='m-4'>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <p className='error'>{error}</p>
                                <Row className='mb-3'>
                                    <Col md={12} xs={12}>
                                        <FormLabel >Email </FormLabel>
                                        <FormControl type='email'  {...register('email', {
                                            required: {
                                                value: true, message: 'This Field is required'
                                            }
                                        })}>
                                        </FormControl>

                                        <p className='error'>{errors.email?.message}</p>
                                    </Col>
                                </Row>

                                <Row className='mb-3'>
                                    <Col md={12} xs={12}>
                                        <FormLabel >Password</FormLabel>
                                        <FormControl type='password'  {...register('password', {
                                            required: {
                                                value: true, message: 'password is required'
                                            }
                                        })}>
                                        </FormControl>
                                        <p className='error'>{errors.password?.message}</p>
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col className='d-flex gap-2'>
                                    <FormCheck type='checkbox' value={true} {...register('rememberMe')}/>
                                    <FormLabel className='fs-6'>Remember me</FormLabel>
                                    </Col>
                                </Row> */}

                                <Row>
                                    <Col className='d-flex'>
                                    <Link to="/forgot-user" className='ms-auto fs-6 text-decoration-none'>forgot password</Link>
                                    </Col>
                                </Row>

                                <Row className='mt-4'>
                                    <CustomButton>
                                        Login
                                    </CustomButton>
                                </Row>
                                <Row >
                                    <Col>
                                        <p className='text-center my-3'> Didn't have an account? <Link to="/register" className='text-decoration-none'>Register</Link></p>

                                    </Col>
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

export default Login