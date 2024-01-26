import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://helloatbackend.onrender.com/api/v1",
  // baseURL: "http://localhost:7000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
