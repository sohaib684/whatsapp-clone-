import React, { useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined, AttachFile, MoreVert } from "@material-ui/icons";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import "./Chat.css";
import axios from "./axios";

function Chat({ contact, messages, onMessageSent, onClearMessages }) {
    const [input, setInput] = useState("");
    const [isPhotoOpen, setIsPhotoOpen] = useState(false);

    const sendMessage = async(e) => {
        e.preventDefault();
        if (!input.trim()) return;

        try {
            const response = await axios.post("/message/new", {
                message: input.trim(),
                name: "You",
                contact: contact.name,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                recieved: false,
            });
            onMessageSent(response.data);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setInput("");
        }
    };
    return (
        <div className="chats">
            <div className="chat__header">
                <Avatar
                    src={contact.avatar}
                    onClick={() => setIsPhotoOpen(true)}
                    className="chat__headerAvatar"
                />
                <div className="chat__headerinfo">
                    <h3>{contact.name}</h3>
                    <p>{contact.lastSeen}</p>
                </div>
                <div className="chat___headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                    <IconButton onClick={onClearMessages} title="Clear chat">
                        <DeleteOutlineIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) => (
                    <p
                        key={message._id || `${message.name}-${message.timestamp}-${message.message}`}
                        className={`chat__message ${message.recieved && "chat__reciever"}`}
                    >
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{message.timestamp}</span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Type a message to ${contact.name}`}
                        type="text"
                    />
                    <button onClick={sendMessage} type="submit">
                        Send message
                    </button>
                </form>
                <MicIcon />
            </div>

            {isPhotoOpen && (
                <div className="chat__photoPreview" onClick={() => setIsPhotoOpen(false)}>
                    <div className="chat__photoPreviewContent">
                        <img src={contact.avatar} alt={contact.name} />
                        <p>{contact.name}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chat;
