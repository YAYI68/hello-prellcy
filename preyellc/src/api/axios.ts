import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:7000/api/v1",
  // baseURL: "https://adminapi.firazi.com",
  headers: {
    "Content-Type": "application/json",
  },
});
