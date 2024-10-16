import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // Fetch previous chat history
    socket.on('chat history', (history) => {
      setMessages(history);
    });

    // Listen for new user messages
    socket.on('admin message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chat history');
      socket.off('admin message');
    };
  }, []);

  const sendResponse = (userId) => {
    const message = { userId, text: inputMessage };
    socket.emit('admin response', message);
    setMessages((prevMessages) => [...prevMessages, { ...message, admin: true }]);
    setInputMessage('');
  };

  return (
    <div>
      <h2>Admin Chat Interface</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.admin ? 'admin-message' : 'user-message'}>
            <p>{msg.message}</p>
            {!msg.admin && <button className='bg-red-700' onClick={() => sendResponse(msg.userId)}>Reply</button>}
          </div>
        ))}
      </div>
      <input 
        type="text" 
        value={inputMessage} 
        onChange={(e) => setInputMessage(e.target.value)} 
        placeholder="Type a message" 
      />
    </div>
  );
};

export default AdminChat;
