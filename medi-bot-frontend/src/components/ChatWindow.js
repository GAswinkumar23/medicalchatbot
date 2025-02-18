import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import InputBox from './InputBox';
import Header from './Header';
// import './App.css';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (text) => {
        const userMessage = { id: messages.length + 1, text: text, sender: 'user' };
        setMessages([...messages, userMessage]);

        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: text }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch response from the server');
            }

            const data = await response.json();
            const botResponse = { id: messages.length + 2, text: data.response, sender: 'bot' };
            setMessages(prevMessages => [...prevMessages, botResponse]);
        } catch (error) {
            console.error('Error:', error);
            const botResponse = { id: messages.length + 2, text: "Error: Unable to get a response from the server.", sender: 'bot' };
            setMessages(prevMessages => [...prevMessages, botResponse]);
        }
    };

    return (
        <div className="chat-window">
            <Header />
            <div className="messages">
                {messages.map(msg => (
                    <Message key={msg.id} text={msg.text} sender={msg.sender} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <InputBox sendMessage={sendMessage} />
        </div>
    );
};

export default ChatWindow;