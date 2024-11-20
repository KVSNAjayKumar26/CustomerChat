import React, { useState } from 'react'
import styled from "@emotion/styled";

const InputContainer = styled.div`
display: flex;
border-top: 1px solid #ddd;
background: white;
`;

const Input = styled.input`
flex: 1;
padding: 10px;
border: none;
outline: none;
`;

const SendButton = styled.button`
padding: 10px;
background-color: #007bff;
color: white;
border: none;
cursor: pointer;
`;

const ChatInput = ({ socket }) => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim()) {
            socket.emit("message", { sender: "user", text: message});
            setMessage("");
        }
    };

  return (
    <InputContainer>
    <Input
    type='text'
    value={message}
    placeholder='Type your message....'
    onChange={(e) => setMessage(e.target.value)}
    onKeyPress={(e) => e.key === "Enter" && handleSend()}
    />
    <SendButton onClick={handleSend}>Send</SendButton>
    </InputContainer>
  );
};

export default ChatInput;