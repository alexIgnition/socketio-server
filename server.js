import express from 'express';
import { createServer as createHTTPServer } from 'http';
import { Server as socketIOServer } from 'socket.io';

const app = express();
const httpServer = createHTTPServer(app);
const io = new socketIOServer(httpServer);

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Handle location updates from clients
  socket.on('locationUpdate', (data) => {
    // Broadcast the location update to all connected clients
    io.emit('locationUpdate', data);
  });
});

// Start the server
const port = 3001;
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
