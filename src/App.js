import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";

const contacts = [
    {
        name: "Manisha Bihar",
        last_message: "video call karo na 😍",
        lastSeen: "online",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    },
    {
        name: "Alia Bangalore",
        last_message: "hotel udupi aaj chalo saath mei❤💖 ",
        lastSeen: "last seen today at 10:42 AM",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
        name: "Riya PSA",
        last_message: "I will call you back, working in PSA now",
        lastSeen: "last seen yesterday at 8:18 PM",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    },
    {
        name: "Ashita Delhi",
        last_message: "Happy birthday🎉to you! 😃",
        lastSeen: "online",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
    },
    {
        name: "Shreya",
        last_message: "Babbyy 💕 movie dekhte hain?",
        lastSeen: "last seen today at 1:25 AM",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    },
];

function App() {
    const [messages, setMessages] = useState([]);
    const [selectedContact, setSelectedContact] = useState(() => ({
        ...contacts[0],
        avatar: localStorage.getItem(`contact-avatar-${contacts[0].name}`) ||
            contacts[0].avatar,
    }));

    const handleContactAvatarChange = (name, avatar) => {
        if (selectedContact.name === name) {
            setSelectedContact((contact) => ({
                ...contact,
                avatar,
            }));
        }
    };

    const handleContactSelect = (contact) => {
        setSelectedContact({
            ...contact,
            avatar: localStorage.getItem(`contact-avatar-${contact.name}`) ||
                contact.avatar,
        });
    };

    const clearMessages = async (contactName) => {
        const includeLegacy = contactName === contacts[0].name;

        try {
            await axios.delete(
                `/message/clear/${encodeURIComponent(contactName)}?includeLegacy=${includeLegacy}`
            );
            setMessages((messages) =>
                messages.filter((message) => (
                    message.contact &&
                    message.contact !== contactName
                ))
            );
        } catch (error) {
            console.error("Error clearing messages:", error);
        }
    };

    const appendMessage = useCallback((message) => {
        setMessages((messages) => {
            if (message._id && messages.some((item) => item._id === message._id)) {
                return messages;
            }

            return [...messages, message];
        });
    }, []);

    useEffect(() => {
        axios.get("/message/sync").then((response) => {
            setMessages(response.data);
        });
    }, []);

    useEffect(() => {
        const pusher = new Pusher("092a44cb9ee81bb0c1c4", {
            cluster: "ap2",
        });

        const channel = pusher.subscribe("messages");
        channel.bind("inserted", (data) => {
            appendMessage(data);
        });
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [appendMessage]);
    const visibleMessages = messages.filter((message) => {
        if (message.contact) {
            return message.contact === selectedContact.name;
        }

        return selectedContact.name === contacts[0].name;
    });

    return (
        <div>
            <div className="background_box"></div>
            <div className="app">
                <div className="app__body">
                    <Sidebar
                        contacts={contacts}
                        selectedContact={selectedContact}
                        onContactSelect={handleContactSelect}
                        onContactAvatarChange={handleContactAvatarChange}
                    />
                    <Chat
                        contact={selectedContact}
                        messages={visibleMessages}
                        onMessageSent={appendMessage}
                        onClearMessages={() => clearMessages(selectedContact.name)}
                    />
                </div>
            </div>
        </div>
    );
}
export default App;
