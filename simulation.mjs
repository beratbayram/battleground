import { WebSocketServer } from "ws";

import { PrismaClient } from "./generated/prisma/index.js";

export const btPrisma = new PrismaClient();

export async function addUnitHistory(unitHistory) {
  await btPrisma.unitHistory.create({
    data: unitHistory,
  });
}

const wss = new WebSocketServer({ port: 8080 });
console.log("WebSocket server started on ws://localhost:8080");

wss.on("connection", function connection(ws) {
  console.log("client connected");
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something");
});
