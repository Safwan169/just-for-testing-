'use client'
import AdminChat from '@/components/Admin';
import ChatComponent from '@/components/ChatComponent';
import { useState } from 'react';

export default function Layout() {
  const [messages, setMessages] = useState([]);

  const handleReceiveMessage = (data) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  return (
    <html>
      <body>
        <div>
          <ChatComponent messages={messages} onReceiveMessage={handleReceiveMessage} />
          <AdminChat></AdminChat>
        </div>
      </body>
    </html>
  );
}