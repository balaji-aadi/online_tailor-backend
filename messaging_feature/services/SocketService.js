import { Server } from "socket.io";
import { whiteListCors } from "../../config/cors.config.js";


class SocketService {
  constructor() {
    this._io = new Server({
      cors: {
        origin: whiteListCors,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
  }

  initListeners() {
    try {
      this._io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("join", (userId) => {
          try {
            socket.join(userId);
            console.log(`User ${userId} joined their room`);
            socket.emit("joined", {
              message: `Successfully joined room ${userId}`,
              room: userId,
            });
          } catch (err) {
            console.error(`Error in join event: ${err.message}`);
          }
        });
        // Typing indicator
        socket.on("typing", ({ to, from }) => {
          try {
            this._io.to(to).emit("typing", { from });
          } catch (err) {
            console.error(`Error in typing event: ${err.message}`);
          }
        });

        socket.on("stopTyping", ({ to, from }) => {
          try {
            this._io.to(to).emit("stopTyping", { from });
          } catch (err) {
            console.error(`Error in stopTyping event: ${err.message}`);
          }
        });
        socket.on("disconnect", () => {
          try {
            console.log("User disconnected:", socket.id);
          } catch (err) {
            console.error(`Error in disconnect event: ${err.message}`);
          }
        });
      });
    } catch (err) {
      console.error(`Error in initListeners: ${err.message}`);
    }
  }

  emitToUser(userId, event, payload) {
    this._io.to(userId.toString()).emit(event, payload);
  }
}

export default SocketService;
