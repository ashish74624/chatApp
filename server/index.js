import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'http';
import { Server as SocketIO } from 'socket.io';

dotenv.config();

const app = express();
const server = new Server(app);
const io = new SocketIO(server, {
  cors: {
    origin: '*', // Enable CORS for all origins for Socket.IO
    methods: ['GET', 'POST'], // Specify allowed methods
  },
});

const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

// Middleware
app.use(cors({ origin: '*' })); // Enable CORS for all origins for Express
app.use(express.json());


// Start server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Socket.IO
io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
