import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { IoIosSend } from 'react-icons/io';
import SockJS from 'sockjs-client';
import LiveFeed from '../pages/LiveFeed';
// import Stomp from 'stompjs/lib/stomp.min';


const CreateComment = ({showModel, handleClose, postId, customerId}) => {

  const name = localStorage.getItem('name')
   const form = useForm();
    const { register, handleSubmit, formState, reset } = form
  
    const { errors } = formState

    // const [showModel, setShowModel] = useState(false);

    // const handleClose = () => setShowModel(false);
    // const handleShow = () => setShowModel(true);


    const onSubmit = (d) =>{
      // try{
      //   axios
      //   .post(`http://localhost:8080/comments?post_id=${postId}&customer_id=${customerId}&comment=${d.comment}`)
      //   .then((res) => {
      //     console.log(res.data);
      //     window.location.reload();
      //   }).catch((error) => console.log("postComment error",error))
      // }catch(error){
      //   console.log("postComment error",error);
      // }

      if (stompClient && stompClient.connected) {
        const data = {
          post_id: postId,
          customer_id: customerId,
          comment: d.comment,
          name: name
        };

        stompClient.send('/app/send-comment', {}, JSON.stringify(data));

      }

      reset();
      
    }
     const [commentCount, setCommentCount] = useState(null);

    const [showComment, setShowComment] = useState([]);

   
    const res = () =>{
       axios.get(`http://localhost:8080/comments?post_id=${postId}`)
        .then((res) => {
        // console.log(res.data.commentData);
        setShowComment(res.data.commentData)
        setCommentCount(res.data.commentCount)
        
      }).catch((error) =>{
        console.log("getComment error", error);
        
      } )
    }
    


    useEffect(() => {
      res()
    },[postId])

   
    const [stompClient, setStompClient ] = useState(null);

    useEffect(() =>{
      const socket = new SockJS("http://localhost:8080/ws");
      const client =  Stomp.over(socket);

      client.connect({}, () => {
        console.log('connected to webSocket');
        client.subscribe('/topic/comments', (msg) =>{
          
          const newComment = JSON.parse(msg.body);
          console.log(`Received: ${msg.body}`)
          setCommentCount(newComment.commentCount);
          
          setShowComment((prev) => [...prev, newComment]);
        });
        
      });


      setStompClient(client);

      return () => {
        if (client) client.disconnect();
      };
    },[])

  return (
    <>

      <Modal show={showModel} onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <ModalHeader closeButton>

          <ModalTitle>Comments</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div>
            {showComment.map((item, index) => (
              
              <div key={index}>
                <p><strong>{((item.name == null) || (item.name == "")) ? name : item.name}:</strong> {item.comment}</p>
              </div>
              // console.log(item)
            ))}
          </div>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup className='mt-3'>

              <FormControl type='text' {...register('comment', {
                required: {
                  value: true, message: 'This Field is required'
                }
              })} ></FormControl>
              <Button type='submit'><IoIosSend /></Button>
            </InputGroup>

          </Form>


        </ModalBody>

      </Modal>

      <LiveFeed commentCount= {commentCount}   />
    </>
  )
}

export default CreateComment