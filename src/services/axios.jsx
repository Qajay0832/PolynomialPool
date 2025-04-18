// frontend/src/services/axios.js
import axios from "axios";
import { io } from "socket.io-client";

// -------------------- Axios Setup --------------------
const API = axios.create({
  baseURL: "https://polynomialpoolserver.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = token; // 🔒 safer with Bearer
  }
  return req;
});

// -------------------- Socket.IO Setup --------------------
const token = localStorage.getItem("token");

const socket = io("https://polynomialpoolserver.onrender.com/", {
  withCredentials: true,
  transports: ["websocket"],
  auth: {
    token,
  },
});

// -------------------- Export Both --------------------
export { API, socket };


