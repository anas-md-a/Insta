import React, { useEffect, useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import axios from 'axios';
import CustomButton from '../components/CustomButton';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import ToastedMessage from '../components/ToastedMessage'

    
// import { globalemail } from './Register'

const RightSide = () => {

  const navigate = useNavigate();

  useEffect(() => {
    value()
  }, [])

  const [email,setEmail] = useState('')
  const [name,setName] = useState('')

  const value = async (d) =>{

  try {
    const response = await fetch(`http://localhost:8080/user?email=${localStorage.getItem('email')}`
        , {
            method: "GET",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(d)
        }
    )
    
    const data = await response.json();
    data.map((userdata) =>{
      // localStorage.clear();
      // localStorage.setItem('customerId', userdata.customerId);
      // console.log(userdata.customerId);
      setEmail(userdata.email);
      setName(userdata.name);
    })
  }catch(error){
    console.log(error.message)
  }

}

const handleLogout = () =>{
  localStorage.clear();
  toast.success("Logout Successfully");

  setTimeout(() => {
    navigate("/");
  }, 1500);
}



  // const getUserEmail = (email) =>{
  //   return axios.get(`http://localhost:8080/user?email=${localStorage.getItem('email')}`)
  // }


  return (
    <div className='text-center p-3  '>
        <div className='m-3 '>
          {/* <img
            alt="PROFILE"
            src=".\publbic\img\OIP.jpg" 
            className="rounded-circle"/> */}

            

            <Image src=".\public\img\OIP.jpg" roundedCircle fluid  width="50%" />
            <h4 className="mt-2">{name}</h4>
            <p>{email}</p>
            <Button  className='btn btn-primary' onClick={handleLogout} >Logout</Button>

            

            {/* className='text-decoration-none' */}

        </div>

            <ToastedMessage/>

    </div>

    

    
  )
}

export default RightSide