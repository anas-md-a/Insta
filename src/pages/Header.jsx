import Reactmport, { useState } from 'react'
import { Button, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormControl, FormGroup, FormLabel, InputGroup, Modal, ModalFooter, ModalHeader, ModalTitle, Nav, Navbar, NavbarBrand, NavbarOffcanvas, NavbarToggle, NavDropdown, NavLink, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap';
import { FaInstagram } from "react-icons/fa";
import CustomButton from '../components/CustomButton';
import { LuSend } from "react-icons/lu";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import axios, { Axios } from 'axios';
import LiveFeed from './LiveFeed';
import { useSearch } from '../components/SearchCreateContext';
import { toast } from 'react-toastify';
import ToastedMessage from '../components/ToastedMessage';
// import Modals from '../components/Modals';


const Header = () => {

//   const form = useForm();
//   const { register, handleSubmit, formState } = form

//   const { errors } = formState
//   // const { fields, append } = useFieldArray({
//   //   control, // Pass control here
//   //   name: "customer_id" // Specify the field array name
//   // });

//   const [showModel, setShowModel] = useState(false);
//   const [error, setError] = useState(null)
//   const [isdisable, setIsdisable] = useState(false)
//   const [file, setFile] = useState(null) 

//   const handleClose = () => setShowModel(false);
//   const handleShow = () => setShowModel(true);

//   const allowedTypes = [ 'image/jpeg', 'image/png'];


//   const handlefile = (e) =>{
//     const selectedFile = e.target.files[0];

//     if(selectedFile && allowedTypes.includes(selectedFile.type)){
//       setFile(selectedFile);
//       setError(null);
//       setIsdisable(false);
//     }else{
//       setFile(null);
//       setError('Only JPG, and PNG files are allowed.');
//       setIsdisable(true);
//     }
//   }

//   // const handleUpload = async () => {
//   //   if (!file) {
//   //     setError('Please upload a file.');
//   //     return;
//   //   }

//   //   const formData = new FormData();
//   //   formData.append('file', file);

//   //   try {
//   //     await axios.post('http://localhost:8080/api/upload', formData, {
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data',
//   //       },
//   //     });
//   //     alert('File uploaded successfully!');
//   //   } catch (err) {
//   //     alert('Upload failed');
//   //   }
//   // };



//   //
 


//   // Handle Search


  
//   // const [query, setQuery] = useState('');
//   // const navigate = useNavigate();
  
//   // search handler
  
  

//   const handleTitle = (e) => {
//     if (e.target.value.trim().length <= 15 ) {
//       console.log(e.target.value.trim().length)
//       setError(null);
//       setIsdisable(false);
//     } else {
//       setError('Invalid title ');
//       setIsdisable(true);
//     }

//   }

//   const handleDesc = (e) => {
//     if (e.target.value.trim().length <= 150) {
//       console.log(e.target.value.trim().length)
//       setIsdisable(false);
//       setError(null);
//     } else {
//       setError('Invalid description');
//       setIsdisable(true);
//     }
//   }

//   const formData = new FormData();

//   const onSubmit = async (d) => {

//     // const fileData = document.getElementById("fileData").file;
//     console.log(d);

    
//     formData.append("title", d.title);
//     formData.append("description", d.description);
//     formData.append("customer_id", d.customer_id);
//       // formData.append("files", d.file[0])

//     if ( d.files.length > 0) {
//       for (let i = 0; i < d.files.length ; i++){
        
//         formData.append("files",d.files[i]);
//       }
//       //  d.files.forEach(file => {
        
//       //  });
//       // d.files.array.forEach(element => {
//       //   map
//       // });((file) => {
//       //   formData.append("files", file);
//       // });
//     }

//     console.log(formData.get("title"));
    

   

    

//     // if (!formData) {
//     //   setError('Please upload a file.');
//     //   return;
//     // }

    
    
    
//     try {

//       // toast.info("Uploading your post... Please wait.", { autoClose: 2000 });

//       const response = await axios.post(`http://localhost:8080/postFeed`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if(response.status === 200){
//         toast.success('Post created successfully!');
//       }else{
//         toast.error("Failed to create post.");
//       }
      
      
//     } catch (error) {
//       toast.error('Failed to create post. Please try again');
//       console.log(error.message);
      
//     }
   
//     // try {
//     //   const response = await fetch(`http://localhost:8080/postFeed`
//     //     , {
//     //       method: "POST",
//     //       headers: { "Content-Type": "multipart/form-data" },
//     //       body: JSON.stringify(d)
//     //     }
//     //   )
      

//     //    const data = await response.text();
      
      
//     // } catch (error) {


//     //   console.log(error.message);
//     // }
//     setShowModel(false);

//   }

//   // Search Bar in header

  
 

//   // const handleSearch = (e) =>{
//   //   navigate(`/result`);

//     // const searchBar = e.target.value;
//     // setQuery(searchBar);
//     // console.log(searchBar);

//     // if (searchBar.length >= 1){
//       // try{
//       //   const response = await axios.get(`http://localhost:8080/searchFeed?query=${searchBar}`)
//       //   setResults(response.data);
//       //   console.log(response.data);
        
//       // }catch(error){
//       //   console.log(error.message);
        
//       // }
//     // }else{
//     //   setResults("No result");
//     // }

    

//     // }
    
//   // }
//   const [results, setResults] = useState([]);

//   const {setSearchQuery} = useSearch();
//   const handleSearch =  (e) => {

//     const value = e.target.value;
//     console.log(value);
    
//     setSearchQuery(value)
   

// }

const navigate = useNavigate();

const handleLogout = () =>{
  localStorage.clear();
  toast.success("Logout Successfully");

  setTimeout(() => {
    navigate("/");
  }, 1500);
}

const expand = 'md';


  


  return (
    <>
    
      {/* <nav className='navbar nav-light bg-light justify-content-between p-3'>

        <div className='d-flex mx-2 '>
          <a className='navbar-brand  '>
            <FaInstagram />
            <span className='m-2 '>Instagram</span>
          </a>
         

        </div>*/}

      <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 ">
        <Container fluid>
          
          <NavbarBrand><FaInstagram />
          <span className='m-2'>Instagram</span>
          </NavbarBrand>
          
          <NavbarToggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <NavbarOffcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <OffcanvasHeader closeButton>
              
              <OffcanvasTitle id={`offcanvasNavbarLabel-expand-${expand}`} className='d-flex align-items-center'>
              <img
                src=".\public\img\OIP.jpg" 
                alt="Profile"
                width="30"
                height="30"
                className="rounded-circle me-2"
              />
              <span>{localStorage.getItem("name")}</span> 
              </OffcanvasTitle>

            </OffcanvasHeader>
            <OffcanvasBody>
              <Nav className="justify-content-end flex-grow-1   ">
              <div className="d-md-none">
                <NavLink onClick={handleLogout}>Logout</NavLink>
              </div>
              <div className="d-none d-md-block ">
                <NavDropdown 
                className="noPaddingDropdown"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                  title={
                    <>
                    <img
                        src=".\public\img\OIP.jpg" 
                        alt="Profile"
                        width="30"
                        height="30"
                        className="rounded-circle me-2"
                      />
                      {localStorage.getItem("name")}
                    </>
                  }
                  align="end"
                  
                >
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </div>
            </Nav>
          </OffcanvasBody>
        </NavbarOffcanvas>
      </Container>
    </Navbar>


      {/* <nav className='navbar navbar-light bg-light justify-content-between p-3'>

       
        <div className='d-flex mx-2'>
          <a className='navbar-brand'>
            <FaInstagram />
            <span className='m-2'>Instagram</span>
          </a>
        </div>

        
        <div className='d-flex align-items-center mx-2'>
          <Dropdown>
            <DropdownToggle variant="light" id="dropdown-basic" className='d-flex align-items-center'>
              <img
                src=".\public\img\OIP.jpg" 
                alt="Profile"
                width="30"
                height="30"
                className="rounded-circle me-2"
              />
              <span>{localStorage.getItem("name")}</span> 
            </DropdownToggle>

            <DropdownMenu align="end">
              <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </nav> */}
        {/* <form className="form-inline">
          <input className="form-control mr-sm-2 rounded-pill" type="text" placeholder="Search" name='searchBar' id='searchBar' onKeyUp={handleSearch}/>
          
        </form> */}
        {/* <div className='d-flex gap-3'> */}
        {/* <Link to="/login"><CustomButton classSelection="btn btn-primary my-2 my-sm-0 rounded-pill" typeName="button">Login</CustomButton></Link>
                <Link to="/register"><CustomButton classSelection="btn btn-secondary my-2 my-sm-0 rounded-pill" typeName="button">Register</CustomButton></Link>
                 */}
        {/* </div> */}
        {/* <div> 
                    <button className='btn btn-light  ' >
                        <LuSend />
                    </button>
                    <button className='btn btn-light ' >
                        <IoIosNotificationsOutline />
                        </button>
                        <button className='btn btn-light ' >
                        <CiMenuFries />

                    </button>
                </div> */}

        {/* <div className='d-flex gap-3'>

          <Button className='btn btn-primary' onClick={handleShow}>Create post</Button>
        </div> */}
        <div>
          {/* <Modal show={showModel} onHide={handleClose}>
            <ModalHeader closeButton>

              <ModalTitle>Create Post</ModalTitle>
            </ModalHeader>
            <Modal.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
              <p className='error'>{error}</p>
                <FormGroup>
                  <FormLabel>Title</FormLabel>
                  <FormControl type='text' {...register('title', {
                    required: {
                      value: true, message: 'This Field is required'
                    }
                  })} onKeyUp={handleTitle}></FormControl>
                  <p className='error'>{errors.title?.message}</p>
                </FormGroup>
                <FormGroup className='mt-3'>
                  <FormLabel>Description</FormLabel>
                  <FormControl as='textarea' {...register('description', {
                    required: {
                      value: true, message: 'This Field is required'
                    }
                  })} onKeyUp={handleDesc}></FormControl>
                  <FormControl type='hidden' value={localStorage.getItem('customerId')} {...register('customer_id')}></FormControl>
                  <p className='error'>{errors.description?.message}</p>
                 
                </FormGroup>
                <FormGroup>
                  <FormControl type='file' 
                  {...register('files', {
                    required: {
                      value: true, message: 'This Field is required'
                    }
                  })} 
                  onChange={ handlefile } multiple></FormControl>
                  <p className='error'>{errors.files?.message}</p>
                  
                </FormGroup>

               
                <ModalFooter>
                  <Button className='btn btn-secondary' onClick={handleClose}>close</Button>
                  <Button className='btn btn-primary' type='submit' disabled={isdisable}>Submit</Button>
                </ModalFooter>
              </Form>
            </Modal.Body>

          </Modal> */}


        </div>



     
              <ToastedMessage/>




      {/* <div className="navbar">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl"><FaInstagram /><span>Instagram</span></a>
  </div>
  <div className="flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt=""
            src="" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div> */}

      < Outlet />
    </>
  )
}

export default Header