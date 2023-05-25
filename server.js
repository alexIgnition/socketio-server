import express from "express";
import { createServer as createHTTPServer } from "http";
import { Server as socketIOServer } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const httpServer = createHTTPServer(app);
const io = new socketIOServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'], // Add any additional HTTP methods if needed
  },
});

// Socket.IO event handling
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  // Handle location updates from clients
  socket.on("locationUpdate", (data) => {
    // Broadcast the location update to all connected clients
    io.emit("locationUpdate", data);
  });
});

// Start the server
const port = 3001;
httpServer.listen(port);
