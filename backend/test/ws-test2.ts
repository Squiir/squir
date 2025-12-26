import { io } from "socket.io-client";

const socket = io("http://localhost:3000/ws", {
  transports: ["websocket"],
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3ZjgxNWFmYS0zZjVhLTQ1ZDEtYWYyMi1hOTIyYjcwOWI5MzIiLCJpYXQiOjE3NjY1OTU0MDAsImV4cCI6MTc2NjU5NjMwMH0.mJnada1HlbfPdqgDeYilLiMBJG180dQL1520-XK1NvY",
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
