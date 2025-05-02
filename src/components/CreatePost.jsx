import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { GoPlusCircle } from 'react-icons/go';
import { toast } from 'react-toastify';

const CreatePost = ({isFirstPost = false}) => {

    const form = useForm();
  const { register, handleSubmit, formState } = form

  const { errors } = formState

    const [showModel, setShowModel] = useState(false);
    const [error, setError] = useState(null)
    const [isdisable, setIsdisable] = useState(false)
    const [file, setFile] = useState(null) 
  
    const handleClose = () => setShowModel(false);
    const handleShow = () => setShowModel(true);
  
    const allowedTypes = [ 'image/jpeg', 'image/png'];
  
    const [imageFormatAck, setImageFormatAck] = useState("Image format *jpeg, *png only")
  
    const handlefile = (e) =>{
      setImageFormatAck(null)
      const selectedFile = e.target.files[0];
  
      if(selectedFile && allowedTypes.includes(selectedFile.type)){
        setFile(selectedFile);
        setError(null);
        setIsdisable(false);
      }else{
        setFile(null);
        setError('Only JPG, and PNG files are allowed.');
        setIsdisable(true);
      }
    }
  
    // const handleUpload = async () => {
    //   if (!file) {
    //     setError('Please upload a file.');
    //     return;
    //   }
  
    //   const formData = new FormData();
    //   formData.append('file', file);
  
    //   try {
    //     await axios.post('http://localhost:8080/api/upload', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });
    //     alert('File uploaded successfully!');
    //   } catch (err) {
    //     alert('Upload failed');
    //   }
    // };
  
  
  
    //
   
  
  
    // Handle Search
  
  
    
    // const [query, setQuery] = useState('');
    // const navigate = useNavigate();
    
    // search handler
    
    const [titleLengthAck, setTitleLengthAck] = useState("Title must be less than 15 characters")
  
    const handleTitle = (e) => {
      setTitleLengthAck(null)
      if (e.target.value.trim().length <= 15 ) {
        console.log(e.target.value.trim().length)
        setError(null);
        setIsdisable(false);
      } else {
        setError('Invalid title ');
        setIsdisable(true);
      }
  
    }
  
    const [desLengthAck, setDesLengthAck] = useState("Description must be less than 150 characters")
  
    const handleDesc = (e) => {
      setDesLengthAck(null)
      if (e.target.value.trim().length <= 150) {
        console.log(e.target.value.trim().length)
        setIsdisable(false);
        setError(null);
      } else {
        setError('Invalid description');
        setIsdisable(true);
      }
    }
  
    const formData = new FormData();
  
    const onSubmit = async (d) => {
  
      // const fileData = document.getElementById("fileData").file;
      console.log(d);
  
      
      formData.append("title", d.title);
      formData.append("description", d.description);
      formData.append("customer_id", d.customer_id);
        // formData.append("files", d.file[0])
  
      if ( d.files.length > 0) {
        for (let i = 0; i < d.files.length ; i++){
          
          formData.append("files",d.files[i]);
        }
        //  d.files.forEach(file => {
          
        //  });
        // d.files.array.forEach(element => {
        //   map
        // });((file) => {
        //   formData.append("files", file);
        // });
      }
  
      console.log(formData.get("title"));
      
  
     
  
      
  
      // if (!formData) {
      //   setError('Please upload a file.');
      //   return;
      // }
  
      
      
      
      try {
  
        // toast.info("Uploading your post... Please wait.", { autoClose: 2000 });
  
        const response = await axios.post(`http://localhost:8080/postFeed`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if(response.status === 200){
          toast.success('Post created successfully!');
          
        }else{
          toast.error("Failed to create post.");
        }
        
        
      } catch (error) {
        toast.error('Failed to create post. Please try again');
        console.log(error.message);
        
      }
     
      // try {
      //   const response = await fetch(`http://localhost:8080/postFeed`
      //     , {
      //       method: "POST",
      //       headers: { "Content-Type": "multipart/form-data" },
      //       body: JSON.stringify(d)
      //     }
      //   )
        
  
      //    const data = await response.text();
        
        
      // } catch (error) {
  
  
      //   console.log(error.message);
      // }
      setShowModel(false);
  
    }



  return (
  <>
   { isFirstPost && (
    <>
    <OverlayTrigger
         key={'bottom'}
         placement={'bottom'}
         overlay={
           <Tooltip id={`tooltip-${'bottom'}`}>
             Create post
           </Tooltip>
         }
       >
       
       <Button className='btn btn-primary ms-auto' onClick={handleShow}><GoPlusCircle /><span className='d-none d-md-inline-block mx-2'> Create post</span></Button>
       </OverlayTrigger>

       <Modal show={showModel} onHide={handleClose}>
           <ModalHeader closeButton>

             <ModalTitle>Create Post</ModalTitle>
           </ModalHeader>
           <ModalBody>
             <Form onSubmit={handleSubmit(onSubmit)}>
             <p className='error'>{error}</p>
               <FormGroup>
                 <FormLabel>Title</FormLabel>
                 <FormControl type='text' {...register('title', {
                   required: {
                     value: true, message: 'This Field is required'
                   }
                 })} onKeyUp={handleTitle}></FormControl>
                  <p className='error'>{titleLengthAck}</p>
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
                 <p className='error'>{desLengthAck}</p>
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
                 <p className='error'>{imageFormatAck}</p>
                 <p className='error'>{errors.files?.message}</p>
                 
               </FormGroup>

              
               <ModalFooter>
                 <Button className='btn btn-secondary' onClick={handleClose}>close</Button>
                 <Button className='btn btn-primary' type='submit' disabled={isdisable}>Submit</Button>
               </ModalFooter>
             </Form>
           </ModalBody>

       </Modal>
   
   </>
   )

   }
  </>
  )
}

export default CreatePost