import React, { useState, useRef } from "react";
import "./Sidebar.css";
import DonutLargeIcons from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import { resizeImageFile } from "./imageStorage";

function Sidebar({ contacts, selectedContact, onContactSelect, onContactAvatarChange }) {
    const defaultAvatar = "https://img.etimg.com/thumb/msid-72140577,width-1070,height-580,imgsize-157876,overlay-etpanache/photo.jpg";
    const [avatarSrc, setAvatarSrc] = useState(() => localStorage.getItem("my-avatar") || defaultAvatar);
    const [searchText, setSearchText] = useState("");
    const fileInputRef = useRef(null);
    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchText.trim().toLowerCase())
    );

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        try {
            const resizedImage = await resizeImageFile(file, 180);
            localStorage.setItem("my-avatar", resizedImage);
            setAvatarSrc(resizedImage);
        } catch (error) {
            console.error("Could not upload avatar:", error);
        }
    };

    return (
        <div className="sidebars">
            <div className="sidebar__header">
                <Avatar
                    src={avatarSrc}
                    onClick={handleAvatarClick}
                    style={{ cursor: "pointer" }}
                />
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <div className="sidebar__headerRight">
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
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search or start new chat"
                        type="text"
                    />
                </div>
            </div>
            <div className="sidebar__chats">
                {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                        <SidebarChat
                            key={contact.name}
                            name={contact.name}
                            last_message={contact.last_message}
                            avatar={contact.avatar}
                            isSelected={selectedContact.name === contact.name}
                            onSelect={() => onContactSelect(contact)}
                            onAvatarChange={onContactAvatarChange}
                        />
                    ))
                ) : (
                    <p className="sidebar__notFound">not in contacts</p>
                )}
            </div>
        </div>
    );
}
export default Sidebar;
