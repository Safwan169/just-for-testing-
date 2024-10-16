const express = require('express');
const http = require('http');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const { Server } = require('socket.io');

// Express অ্যাপ তৈরি
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB কানেকশন

const uri = `mongodb+srv://E-Commerce:Ek8lDolOocB9DkxU@cluster0.6zehkma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const { ServerApiVersion, ObjectId } = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const database = client.db("E-Commerce")
const chatCollection = database.collection("massages")

// HTTP সার্ভার তৈরি
const server = http.createServer(app);

// Socket.IO ইন্টিগ্রেশন
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React ফ্রন্টএন্ড থেকে কানেক্ট করার জন্য
    methods: ["GET", "POST"]
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  // Send previous chat history from MongoDB
  chatCollection.find({}).toArray((err, messages) => {
    if (err) throw err;
    socket.emit('chat history', messages);
  });

  // Handle user messages
  socket.on('send message', async (message) => {
    const chatMessage = { userId: socket.id, message: message.text, admin: false, timestamp: new Date() };

    // Save message to MongoDB
    await chatCollection.insertOne(chatMessage);

    // Emit message to admin
    io.emit('admin message', chatMessage);
  });

  // Handle admin responses
  socket.on('admin response', async (message) => {
    const adminMessage = { userId: message.userId, message: message.text, admin: true, timestamp: new Date() };

    // Save admin response to MongoDB
    await chatCollection.insertOne(adminMessage);

    // Emit admin response to the user
    io.to(message.userId).emit('admin response', adminMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 3000');
});

