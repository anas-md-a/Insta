// import React, { useEffect, useState } from 'react';
// import SockJS from 'sockjs-client';

// import * as Stomp from 'stompjs/lib/stomp.min.js';



// const Demo = () => {

//     const [messages, setMessages] = useState([]);
//   const [client, setClient] = useState(null);

//   useEffect(() => {
//     const socket = new SockJS('http://localhost:8080/ws');
//     const stompClient = Stomp.over(socket);

//     stompClient.connect({}, () => {
//       console.log('Connected');

//       stompClient.subscribe('/topic/messages', (message) => {
//         setMessages((prev) => [...prev, message.body]);
//       });

//       setClient(stompClient);
//     });

//     return () => {
//       if (stompClient && stompClient.connected) {
//         stompClient.disconnect(() => {
//           console.log('Disconnected');
//         });
//       }
//     };
//   }, []);

//   const sendMessage = () => {
//     if (client && client.connected) {
//       client.send('/app/send', {}, 'Hello from React!');
//     }
//   };




//   return (
//      <div>
//       <h2>WebSocket Chat</h2>
//       <button onClick={sendMessage}>Send Message</button>
//       <ul>
//         {messages.map((msg, i) => (
//           <li key={i}>{msg}</li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default Demo




// const WebSocketChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [client, setClient] = useState(null);

//   useEffect(() => {
//     const socket = new SockJS('http://localhost:8080/ws');
//     const stompClient = new Client({
//       webSocketFactory: () => socket,
//       reconnectDelay: 5000,
//       onConnect: () => {
//         console.log('Connected to WebSocket');
//         stompClient.subscribe('/topic/messages', (message) => {
//           setMessages((prev) => [...prev, message.body]);
//         });
//       },
//     });

//     stompClient.activate();
//     setClient(stompClient);

//     return () => {
//       stompClient.deactivate();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (client) {
//       client.publish({
//         destination: '/app/send',
//         body: 'Hello from React!',
//       });
//     }
//   };

//   return (
//     <div>
//       <h2>WebSocket Chat</h2>
//       <button onClick={sendMessage}>Send Message</button>
//       <ul>
//         {messages.map((msg, i) => (
//           <li key={i}>{msg}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default WebSocketChat;
