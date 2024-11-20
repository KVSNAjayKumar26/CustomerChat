import React from 'react'
import styled from "@emotion/styled";
const MessagesContainer = styled.div`
margin: 5px 0;
text-align: ${(props) => (props.sender === "user" ? "right" : "left" )};
`;

const MessageBubble = styled.div`
display: inline-block;
padding: 10px;
background-color: ${(props) => 
    props.sender === "user" ? "#007bff" : "#f1f1f1"};
    color: ${(props) => (props.sender === "user" ? "white" : "black")};
    border-radius: 10px;
    max-width: 70%;
`;

const Message = ({ sender, text}) => {
  return (
    <MessagesContainer sender={sender}>
        <MessageBubble sender={sender}>{text}</MessageBubble>
    </MessagesContainer>
  );
};

export default Message;