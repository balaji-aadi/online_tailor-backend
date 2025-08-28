import "dotenv/config";
import http from "http";
import { socketService } from "./messaging_feature/socket.js";
import connectDB from "./config/db.config.js";
import app from "./app.js";
import "./models/Master.js"; // Register Country and City models

const port = process.env.PORT || 5008;
const httpServer = http.createServer(app);

// Attach Socket.io to HTTP server
socketService._io.attach(httpServer);
socketService.initListeners();

connectDB()
  .then(() => {
    httpServer.listen(port, () => {
      console.log(`⚙️ Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed!!!", err);
  });
