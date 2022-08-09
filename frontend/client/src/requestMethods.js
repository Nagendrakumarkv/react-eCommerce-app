import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
//const TOKEN=JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGUzZWVjYjg0NjA4YWE1NjllMGY0NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTA4MzQ1NiwiZXhwIjoxNjU5MzQyNjU2fQ.1DkKnW8xVSxbpqKjJ0sWC6ll-jbImQWRcqMjHSfWVck";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Barear ${TOKEN}` },
});
