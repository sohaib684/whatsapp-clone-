import React from "react";
import "./Sidebar.css";
import DonutLargeIcons from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import {Avatar,IconButton} from "@material-ui/core"  ;
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
function Sidebar(){
    return (
        <div className="sidebars">
        <div className ="sidebar__header">
        <Avatar src = "https://img.etimg.com/thumb/msid-72140577,width-1070,height-580,imgsize-157876,overlay-etpanache/photo.jpg"
        />
        <div className = "sidebar__headerRight">
        <IconButton>
          <DonutLargeIcons />
        </IconButton>
        <IconButton>
            <ChatIcon />
        </IconButton>
        <IconButton>
            <MoreVertIcon />
        </IconButton>

        </div>
        </div>
        <div className ="sidebar__search" >
          <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder ="Search or start new chat"
           type="text" />
           </div>
                  </div>
                  <div className="sidebar__chats">
                      <SidebarChat name="Nancy"  last_message="waiting for the college to reopen...🤷‍♂️"/>
                      <SidebarChat name="Shayan" last_message="pdho jaakr kya khel rhe itna "/>
                      <SidebarChat name="Rahul" last_message="kal aate hai ghar pr ^_^"/>
                      <SidebarChat name="Emma" last_message="Happy birthday🎉😃"/>
                      <SidebarChat name="Pona" last_message="Chal hatt"/>
                  </div>
        </div>
        
     ); 
}
export default Sidebar;