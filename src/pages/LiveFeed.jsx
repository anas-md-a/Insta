import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, CardBody, CardImg, CardText, Carousel, CarouselCaption, CarouselItem, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Stack } from 'react-bootstrap'
import { AiOutlineLike } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

import { FaRegComment } from "react-icons/fa";
import { PiShareFat, PiX } from "react-icons/pi";
import feedData from "../data/feedData.json"
import NoFeed from './NoFeed';
import { useSearch } from '../components/SearchCreateContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import ToastedMessage from '../components/ToastedMessage';
import CreateComment from '../components/CreateComment';
// import Demo from '../components/Demo';


const LiveFeed = ({commentCount  , show = true}) => {

  const port = "http://localhost:8080/";
  const customerId = localStorage.getItem('customerId');

  

  const [post, setPost] = useState([])
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    value()
  }, [])

  var data = null;

  const value = async (d) => {

    

    try {
      const response = await fetch(`http://localhost:8080/fetchImg`
        , {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(d)
        }
      )

      data = await response.json();
      // console.log(data);




      (setPost(data))





      // data.map((userdata) =>{
      //  setTitle(userdata.title)
      //  setDescription(userdata.description)
      //  setId(userdata.id)
      //  setPost(userdata.title);

      // })
    } catch (error) {
      console.log(error.message)
    }

    // console.log(data);
    //  console.log(post)

  }

  const { searchQuery } = useSearch();
  const [results, setResults] = useState([]);
  
  var searchLength = null;
  useEffect(() => {
    if (searchQuery.length > 0) {
    axios
        .get(`http://localhost:8080/searchFeed?query=${searchQuery}`)
        .then((res) => setResults(res.data))
        .catch((err) => console.error("Search failed", err));
        
        searchLength = results;
         console.log(searchLength);
        
    }else if ((searchQuery.length > 0) && (searchLength < 1)){
      setResults([])
      
      
    }
  }, [searchQuery]);


const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deletePostId, setDeletePostId] = useState(null);

  const handleDelete = (id) => {

    setDeletePostId(id);
    setShowDeleteModal(true);


    // if (window.confirm(`Are you sure you want to delete post `)) {
   
  
    
    // axios.put(`http://localhost:8080/deletePost?id=${id}`)
    //   .then(res => console.log(res.data))
    //   .catch(err => console.error(err));
    // }else{
      
    //   console.log("Delete cancelled");
    // }
  };

  const imageStyle = {
    width: '100%',
    height: '10rem',
    objectFit: 'cover',
  };
  
  // const imageContainerStyle = {
  //   height: '200px',
  //   overflow: 'hidden',
  // };

  // const postContainerStyle = {
  //   width: '18rem',
  //   height: 'auto',
  //   display: 'inline-block',
  //   verticalAlign: 'top',
  //   margin: '0.5rem',
  //   borderRadius: '0.25rem',
  //   border: '1px solid #dee2e6', // similar to Bootstrap's default border
  //   overflow: 'hidden',
  // };

  const bodyPadding = {
    padding: ' 0.6rem',
  };

  const sharedCardStyle = {
    width: '18rem',
    marginTop : '0.8rem',
    marginRight : '1.5rem',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };


  const [expandedPosts, setExpandedPosts] = useState({});
  
  const toggleDescription = (id) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // const [imgLeng, setImgLeng] = useState(0)


  const [likesCount, setLikesCount] = useState({});


  const handleLikes = (d) =>{
     axios
        .post(`http://localhost:8080/likes?post_id=${d.id}&customer_id=${customerId}`)
        .then((res) => {
          console.log(res.data)
          if(res.data.post_id === d.id){
            setLikesCount((prev) =>({
              ...prev,
              [d.id] : res.data.likesCount,
            }))
          }
        })
        .catch((err) => console.error("likes error", err));
        
  }

  // const getLikes = (post) =>{
    
  //     axios
  //       .get(`http://localhost:8080/getlikes?post_id=${post.id}`)
  //       .then((res) => {
  //         if (res.data.post_id === post.id) {
  //           console.log(res.data.post_id === post.id);
            
  //           setLikesCount((prev) => ({
  //             ...prev,
  //             [post.id]: res.data.likesCount,
  //           }))
  //         }
  //       }).catch((error) => console.log("getLike error",error)
  //       )
  //   }
  

  // useEffect(() =>{
  //   if(post && post.length>0){
  //     post.forEach(getLikes)
  //   }
  // },[post])

 
     useEffect(() =>{
      post.map((d) => {
        axios
        .get(`http://localhost:8080/getlikes?post_id=${d.id}`)
        .then((res) => {
          if (res.data.post_id === d.id) {
            console.log(res.data.post_id === d.id);
            
            setLikesCount((prev) => ({
              ...prev,
              [d.id]: res.data.likesCount,
            }))
          }
        }).catch((error) => console.log("getLike error",error))
      })
    },[post])


    // For Comment model
    const [postId, setPostId] = useState();
    const [showModel, setShowModel] = useState(false);
    const handleClose = () => setShowModel(false);
    const handleShow = (d) => 
      {setShowModel(true)
        setPostId(d.id);
        
      };

 
  return (
   <>
   {show && (
     <>

     
      {results.length === 0 ? (



        post.length === 0 ? (<NoFeed />) :

          (post.map((d) => {

           
              
            
            //  console.log(d.deleted);
            // const images = d.imgPath.split(',');

            const isMultiple = d.imgPath.includes(',');



            // console.log(isMultiple)
            const images = isMultiple ? d.imgPath.split(',') : d.imgPath;

            

            // if(Array.isArray(images)){
            //   setImgLeng (images.length)
            // }
            
            // console.log(imgLeng);

            // <Badge pill bg="dark">
            //  {imgLeng}
            // </Badge>
            

            return isMultiple ? (
              <div style={sharedCardStyle} key={d.id} className="d-inline-block border">
                <Carousel interval={null} indicators={false}>
                  {images.map((img, i) => (
                    <Carousel.Item key={i}>
                      <img
                        src={port + img.trim()}
                        style={imageStyle}
                        alt={`slide-${i}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              <div style={bodyPadding}>
                 
                  <div>
                    <button className="btn btn-transparent" 
                    onClick={() => handleLikes(d)}><AiOutlineLike />{(likesCount[d.id] ?? d.likesCount) > 0 && (likesCount[d.id] ?? d.likesCount)}</button>
                    <button className="btn btn-transparent"
                    onClick={() => {handleShow(d)}}><FaRegComment />{commentCount}</button>
                    <button className="btn btn-transparent"><PiShareFat /></button>
                  </div>
                  <h6 className="mt-2 ">{d.title}</h6>
                  <p style={{ fontSize: '0.75rem' }}>
                  {expandedPosts[d.id]
                        ? d.description
                        : d.description.length > 60
                          ? d.description.substring(0, 60) + '...'
                          : d.description}
                      {d.description.length > 60 && (
                        <span
                          onClick={() => toggleDescription(d.id)}
                          style={{
                            color: "grey",
                            cursor: "pointer",
                            marginLeft: "5px",
                            fontSize: "0.8rem"
                          }}
                        >
                          {expandedPosts[d.id] ? " Show less" : " Read more"}
                        </span>
                      )}
                      </p>
                      <div className="d-flex justify-content-end">
                    <button className="btn btn-primary-transparent" onClick={() => handleDelete(d)}><MdDeleteOutline /></button>
                  </div>
                </div>
              </div>



            ) : (
                <Card style={sharedCardStyle} key={d.id} className="d-inline-block">
                  <CardImg
                    variant="top"
                    src={port + images.trim()}
                    style={imageStyle}
                    alt="post-img"
                  />
                  <CardBody style={bodyPadding}>
            
                   
                    <div>
                      <button className="btn btn-transparent" 
                      onClick={() => {
                     handleLikes(d)}}
                      ><AiOutlineLike />{(likesCount[d.id] ?? d.likesCount) > 0 && (likesCount[d.id] ?? d.likesCount)}</button>
                      <button className="btn btn-transparent"
                    onClick={() => {handleShow(d)}}><FaRegComment /></button>
                      <button className="btn btn-transparent"><PiShareFat /></button>
                    </div>
                    <h6 className="mt-2 mb-1">{d.title}</h6>
                    <p style={{ fontSize: '0.75rem' }} className='mt-2 mb-3'>
                      {expandedPosts[d.id]
                        ? d.description
                        : d.description.length > 60
                          ? d.description.substring(0, 60) + '...'
                          : d.description}
                      {d.description.length > 60 && (
                        <span
                          onClick={() => toggleDescription(d.id)}
                          style={{
                            color: "grey",
                            cursor: "pointer",
                            marginLeft: "5px",
                            fontSize: "0.8rem"
                          }}

                          
                        >
                          {expandedPosts[d.id] ? " Show less" : " Read more"}
                        </span>
                      )}
                    </p>
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-primary-transparent"
                        onClick={() => handleDelete(d)}
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </CardBody>
                </Card>

            )
          

          }))


      ) : (
        (results.map((d) => {
          console.log(d)
          var imgLen = d.imgPath.length;
          if(!d.deleted){
            console.log(d.rm.customerId);
            if(d.rm.customerId == localStorage.getItem('customerId') ){
              
              
          const isMultiple = d.imgPath.includes(',');
          console.log(isMultiple);
          const images = isMultiple ? d.imgPath.split(',') : d.imgPath;
          console.log(images);
          
         
          return isMultiple ? (
            <div style={sharedCardStyle} key={d.id} className="d-inline-block border">
                <Carousel interval={null} indicators={false}>
                  {images.map((img, i) => (
                    <Carousel.Item key={i}>
                      <img
                        src={port + img.trim()}
                        style={imageStyle}
                        alt={`slide-${i}`}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              <div style={bodyPadding}>
                 
                  <div>
                    <button className="btn btn-transparent"><AiOutlineLike /></button>
                    <button className="btn btn-transparent"><FaRegComment /></button>
                    <button className="btn btn-transparent"><PiShareFat /></button>
                  </div>
                  <h6 className="mt-2 ">{d.title}</h6>
                  <p style={{ fontSize: '0.75rem' }}>
                  {expandedPosts[d.id]
                        ? d.description
                        : d.description.length > 60
                          ? d.description.substring(0, 60) + '...'
                          : d.description}
                      {d.description.length > 60 && (
                        <span
                          onClick={() => toggleDescription(d.id)}
                          style={{
                            color: "grey",
                            cursor: "pointer",
                            marginLeft: "5px",
                            fontSize: "0.8rem"
                          }}
                        >
                          {expandedPosts[d.id] ? " Show less" : " Read more"}
                        </span>
                      )}
                      </p>
                      <div className="d-flex justify-content-end">
                    <button className="btn btn-primary-transparent" onClick={() => handleDelete(d.id)}><MdDeleteOutline /></button>
                  </div>
                </div>
              </div>


          ) : (
            <Card style={sharedCardStyle} key={d.id} className="d-inline-block">
            <CardImg
              variant="top"
              src={port + images.trim()}
              style={imageStyle}
              alt="post-img"
            />
            <CardBody style={bodyPadding}>
      
             
              <div>
                <button className="btn btn-transparent"><AiOutlineLike /></button>
                <button className="btn btn-transparent"><FaRegComment /></button>
                <button className="btn btn-transparent"><PiShareFat /></button>
              </div>
              <h6 className="mt-2 mb-1">{d.title}</h6>
              <p style={{ fontSize: '0.75rem' }} className='mt-2 mb-3'>
                {expandedPosts[d.id]
                  ? d.description
                  : d.description.length > 60
                    ? d.description.substring(0, 60) + '...'
                    : d.description}
                {d.description.length > 60 && (
                  <span
                    onClick={() => toggleDescription(d.id)}
                    style={{
                      color: "grey",
                      cursor: "pointer",
                      marginLeft: "5px",
                      fontSize: "0.8rem"
                    }}

                    
                  >
                    {expandedPosts[d.id] ? " Show less" : " Read more"}
                  </span>
                )}
              </p>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-primary-transparent"
                  onClick={() => handleDelete(d.id)}
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </CardBody>
          </Card>

          )

        }
      }else {
       return  <NoFeed />
      }

          



        }))
      )}



      {/* // model delete alert */}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
  <ModalHeader closeButton>
    <ModalTitle>Confirm Deletion</ModalTitle>
  </ModalHeader>
  <ModalBody>
    Are you sure you want to delete this post?
  </ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
      Cancel
    </Button>
    <Button
      variant="danger"
      onClick={() => {
        axios
          .put(`http://localhost:8080/deletePost?id=${deletePostId}`)
          .then((res) => {
            console.log(res.data);
            setShowDeleteModal(false);
            toast.success("Post Successfully Deleted")
            value()
            
          })
          .catch((err) => console.error(err));
      }}
    >
      Delete
    </Button>
  </ModalFooter>
</Modal>


<CreateComment showModel={showModel} handleClose={handleClose} postId={postId} customerId={customerId}/>

<ToastedMessage/>

{/* <Demo /> */}


    </>
   )}
   </>

  );


}

export default LiveFeed