import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
//   .currentUser.accessToken;

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGUzZWVjYjg0NjA4YWE1NjllMGY0NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTM3ODg2NSwiZXhwIjoxNjU5NjM4MDY1fQ.YDeVN6B5UmTSA1Rd9CHuaigWMZ2aKjr8sQQJD-vAPzo";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Barear ${TOKEN}` },
});
