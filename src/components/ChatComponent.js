import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // Fetch previous chat history
    socket.on('chat history', (history) => {
      setMessages(history);
    });

    // Listen for admin responses
    socket.on('admin response', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chat history');
      socket.off('admin response');
    };
  }, []);

  const sendMessage = () => {
    const message = { text: inputMessage };
    socket.emit('send message', message);
    setMessages((prevMessages) => [...prevMessages, { ...message, admin: false }]);
    setInputMessage('');
  };

  return (
    <div>
      <h2>Chat with Admin</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.admin ? 'admin-message' : 'user-message'}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <input 
        type="text" 
        value={inputMessage} 
        onChange={(e) => setInputMessage(e.target.value)} 
        placeholder="Type a message" 
      />
      <button className='bg-red-400' onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
