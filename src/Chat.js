import React from "react";
import {Avatar,IconButton} from "@material-ui/core";
import {SearchOutlined,AttachFile,MoreVert, Message, InsertEmoticon, SettingsInputAntenna} from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import "./Chat.css";
import { useState } from "react";
import axios from "./axios";
function Chat({messages} ) {
    const [input, setInput] = useState("");
    const sendMessage = async(e) =>{
        e.preventDefault(); 
        console.log("working")
        await axios.post("/message/new",
            {
                message:input,
                name:"shayan alam",
                timestamp:"Do the work!!",
                recieved :true,
            });
            setInput('');
    }; 
    return (
        <div className="chats">
        <div className="chat__header">
            <Avatar />
            <div className ="chat__headerinfo">
                <h3>Nancy</h3>
                <p>last seen today at 11:07 PM </p>
            </div>
            <div className = "chat___headerRight">
              <IconButton>
              <SearchOutlined/>
              </IconButton>
              <IconButton>
                  <AttachFile/>
                  </IconButton>
              <IconButton>
                  <MoreVert/>
              </IconButton>
               </div>
            </div>
        <div className="chat__body">
        {messages.map((message) => (
        <p className={`chat__message ${message.recieved && "chat__reciever"}`}>
        <span className="chat__name">{message.name} </span>  
        {message.message}
         <span className="chat__timestamp">
          {message.timestamp} </span>
         </p> 
        ) ) }
         </div>
         <div className="chat__footer">
             <InsertEmoticonIcon/>
             <form>
                 <input value={input} onChange ={(e) => setInput(e.target.value)} 
                 placeholder="Type a message"
                type="text" />
                <button onClick ={sendMessage} type="submit">Send message
                </button>
             </form>
             <MicIcon/>    
         </div>
        </div>
        );
}

export default Chat;
    