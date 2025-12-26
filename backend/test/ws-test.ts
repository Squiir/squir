import { io } from "socket.io-client";

const socket = io("http://localhost:3000/ws", {
  transports: ["websocket"],
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNzJiMWVmNy0yYWUyLTQyNzYtYTQzNi1lMjgyYzc4NWE2M2MiLCJpYXQiOjE3NjY1OTUwNjcsImV4cCI6MTc2NjU5NTk2N30.YWyUm8OHUtDggnXG4fdUU2hciV2dldJ2mYXLdfis_Wo",
  },
});

socket.on("connect", () => {
  console.log("connected", socket.id);

  socket.emit("group:sendMessage", {
    groupId: "947c8f6e-98b7-446d-b84e-0c2adecdd430",
    text: "Hello le groupe 👋",
  });
});

socket.on("group:newMessage", (msg) => {
  console.log("new message", msg);
});
