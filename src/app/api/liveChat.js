import { Server } from 'socket.io';

let io;

const handler = (req, res) => {
  if (!io) {
    io = new Server(req.socket, {
      path: 'http://localhost:3000/api/liveChat', // Adjust the path as needed
      transports: ['websocket']
    });
  }

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend's domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end(); // Respond to preflight requests with 200 OK
  } else {
    res.end();

    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('message', (data) => {
        // Validate sender (ensure it's an admin)
        if (data.sender === 'admin') {
          io.emit('message', data); // Broadcast to all clients
        } else {
          // Handle invalid sender (e.g., send an error message)
        }
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
  }
};

export default handler;