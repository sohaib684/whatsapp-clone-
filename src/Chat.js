import React from "react";
import {Avatar,IconButton} from "@material-ui/core";
import {SearchOutlined,AttachFile,MoreVert, Message, InsertEmoticon} from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import "./Chat.css";
function Chat() {
    return (
        <div className="chats">
        <div className="chat__header">
            <Avatar />
            <div className ="chat__headerinfo">
                <h3>Rahul</h3>
                <p>last seen today at 9:11 AM </p>
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
        <p className="chat__message">
        <span className="chat__name"> </span>
         How are you buddy!!   
         <span className="chat__timestamp">
          {new Date().toLocaleTimeString()}</span>
         </p>
        <p className="chat__message chat__reciever">
        <span className="chat__name"> </span>
         I am fine!!   
         <span className="chat__timestamp">
          {new Date().toLocaleTimeString()}</span>
         </p>
        <p className="chat__message">
        <span className="chat__name"> </span>
            😒😒😒
         <span className="chat__timestamp">
          {new Date().toLocaleTimeString()}</span>
         </p>
         </div>
         <div className="chat__footer">
             <InsertEmoticonIcon/>
             <form>
                 <input placeholder="Type a message"
                type="text" />
                <button type="submit">Send message
                </button>
             </form>
             <MicIcon/>    
         </div>
        </div>
        );
}

export default Chat;
    