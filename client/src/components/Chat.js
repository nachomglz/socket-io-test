import { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import UserContext from "./UserContext";

const socket = io("http://localhost:4000");

function Chat() {
   const { username } = useContext(UserContext);

   const [message, setMessage] = useState("");
   const [messages, setMessages] = useState([]);

   useEffect(() => {
      socket.on("recieve-message", ({ username, message }) => {
         console.log(username, message);
         setMessages((messages) => [...messages, { username, message }]);
      });
      socket.on("notification", ({ message }) => {
         alert(message);
      });
   }, []);

   const sendMessage = () => {
      socket.emit("send-message", { username, message });
      setMessages((messages) => [...messages, { username, message }]);
   };

   return (
      <div className="chat-page">
         <div className="chat-header">Bienvenido/a {username}</div>
         <div className="chat-container">
            {messages &&
               messages.map((value, index) => (
                  <div
                     className={`message-box ${value.username === username ? "outgoing-message" : "incoming-message"}`}
                  >
                     <span className="name">{value.username}</span>
                     <span className="message-body">{value.message}</span>
                  </div>
               ))}
         </div>
         <div className="input-container">
            <input
               type="text"
               placeholder="Escribe un mensaje..."
               onChange={(event) => setMessage(event.target.value)}
            />
            <button onClick={sendMessage}>
               <img src={require("../images/send.png")} alt="" />
            </button>
         </div>
      </div>
   );
}

export default Chat;
