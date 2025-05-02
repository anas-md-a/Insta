import React, { useEffect, useState } from 'react'
import LiveFeed from './LiveFeed'
import { Button, Form, FormControl, FormGroup, FormLabel, Modal, ModalFooter, ModalHeader, ModalTitle, OverlayTrigger, Tooltip } from 'react-bootstrap'
import ToastedMessage from '../components/ToastedMessage'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSearch } from '../components/SearchCreateContext'
import { FiPlus } from "react-icons/fi";
import { GoPlusCircle } from 'react-icons/go'
import CreatePost from '../components/CreatePost'

const CenterFeed = () => {

  
  // const { fields, append } = useFieldArray({
  //   control, // Pass control here
  //   name: "customer_id" // Specify the field array name
  // });


  // This hook for auto refresh post when user upload the image
  const[post, setPost] = useState([]);

  const[availablePost, setAvailablePost] = useState();

  const fetchPosts = async () => {
    const customerId = localStorage.getItem("customerId");
    try {
      const res = await fetch(`http://localhost:8080/fetchImg?customer_id=${customerId}`);
      const data = await res.json();
      console.log(data);

      if(data.length < 1){
        setAvailablePost(false)
      }else{
        setAvailablePost(true)
      }
      
      setPost(data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  
  


 

  // Search Bar in header

  
 

  // const handleSearch = (e) =>{
  //   navigate(`/result`);

    // const searchBar = e.target.value;
    // setQuery(searchBar);
    // console.log(searchBar);

    // if (searchBar.length >= 1){
      // try{
      //   const response = await axios.get(`http://localhost:8080/searchFeed?query=${searchBar}`)
      //   setResults(response.data);
      //   console.log(response.data);
        
      // }catch(error){
      //   console.log(error.message);
        
      // }
    // }else{
    //   setResults("No result");
    // }

    

    // }
    
  // }
  const [results, setResults] = useState([]);

  const {setSearchQuery} = useSearch();
  const handleSearch =  (e) => {

    const value = e.target.value;
    console.log(value);
    
    setSearchQuery(value)
   

}
  return (
    <div className='my-3'>
      <div className='d-flex mb-3 '>
      <form className="form-inline">
          <input className="form-control mr-sm-2 rounded-pill" type="text" placeholder="Search" name='searchBar' id='searchBar' onKeyUp={handleSearch} />
      </form>
      <CreatePost isFirstPost={availablePost} />
    
     
      </div>

        <h6>Feeds</h6>
        <LiveFeed   />


       
        
    </div>
  )
}

export default CenterFeed