import { WebSocketServer } from "ws";

// { "timestamp": "2025-03-28T08:00:00Z", "lat": 40.500, "lng": 30.500 }

const wss = new WebSocketServer({ port: 8080 });
console.log("WebSocket server started on ws://localhost:8080");

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  setInterval(() => {
    const timestamp = new Date().toISOString();
    const lat = Math.random() * 10 + 30;
    const lng = Math.random() * 10 + 30;
    const message = JSON.stringify({ timestamp, lat, lng, id: 0 });
    ws.send(message);
  }, 1000);
});
