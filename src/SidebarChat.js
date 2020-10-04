import React from 'react';
import {Avatar} from "@material-ui/core";
import "./SidebarChat.css";
function SidebarChat({name, last_message}) {
    return (
        <div className ="sidebarChat"> 
        <Avatar />
        <div className="sidebarChat__info">
        <h2>{name} </h2>
        <p> {last_message}</p></div>
        </div>

    );
}

export default SidebarChat
  