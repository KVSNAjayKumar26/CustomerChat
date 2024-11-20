import React, { useEffect, useRef, useState } from 'react'
import styled from"@emotion/styled";
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import Message from './Message';
import ChatInput from './ChatInput';
const ChatBoxContainer = styled(motion.div)`
position: fixed;
bottom: 20px;
right: 20px;
width: 350px;
height: 500px;
background: linear-gradient(135deg, #007bff, #00d4ff);
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
border-radius: 10px;
display: flex;
flex-direction: column;
overflow: hidden;
`;

const MessagesContainer = styled.div`
flex: 1;
padding: 10px;
overflow-y: auto;
background-color: white;
`;

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const newSocket = io("http://localhost:4000");
        setSocket(newSocket);

        newSocket.on("message", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => newSocket.close();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
  return (
    <ChatBoxContainer
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    >
        <MessagesContainer>
            {messages.map((msg, index) => (
                <Message key={index} sender={msg.sender} text={msg.text} />
            ))}
            <div ref={messagesEndRef} />
        </MessagesContainer>
        <ChatInput socket={socket} />
    </ChatBoxContainer>
  );
};

export default ChatBox;