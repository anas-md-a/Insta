import React, { useEffect, useState } from 'react'
import AdminPage from './AdminPage'
import axios from 'axios';

const UserRegister = () => {

  // const [userData, setUserData] = useState([]);

  //  useEffect(() => {
  //   getUserData()
  //     }, [])
  

 

  return (
    <>

    {/* {
      userData.map((d) => {
        console.log(d);
        
      })
    } */}

     <AdminPage isAdminList = {false} isAdmin= {false}/>

     
    </>
  )
}

export default UserRegister