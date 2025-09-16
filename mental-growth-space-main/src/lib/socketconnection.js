import { io } from "socket.io-client";

// Create a singleton socket connection
class SocketManager {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = new Map();
  }

  connect() {
    if (this.socket && this.socket.connected) {
      console.log("Socket already connected");
      return this.socket;
    }

    this.socket = io("https://sih-project-1-1.onrender.com", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      forceNew: true
    });

    // Connection event listeners
    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket.id);
      this.isConnected = true;
      this.emitToListeners("connect", this.socket.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      this.isConnected = false;
      this.emitToListeners("disconnect", reason);
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      this.isConnected = false;
      this.emitToListeners("connect_error", error);
    });

    return this.socket;
  }

  // Add event listener
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);

    // Also add to socket if connected
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  // Remove event listener
  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }

    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  // Emit event
  emit(event, data) {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    } else {
      console.warn("Socket not connected, cannot emit:", event);
    }
  }

  // Emit to internal listeners
  emitToListeners(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error("Error in socket listener:", error);
        }
      });
    }
  }

  // Disconnect
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Get connection status
  get connected() {
    return this.isConnected && this.socket && this.socket.connected;
  }

  // Get socket instance
  get socketInstance() {
    return this.socket;
  }
}

// Create singleton instance
const socketManager = new SocketManager();

// Export the socket connection
export const socketconnection = socketManager;

// Auto-connect when imported
socketManager.connect();

export default socketManager;
