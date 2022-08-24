import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZmJlMDc2YjRlNTAwNzM2ODcwZTdlOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MDY3NzY5OSwiZXhwIjoxNjYwOTM2ODk5fQ.-q0r9XkjhIhg6ODWQ8a3zScnT4qO6dau2tVz0ygTACo";

console.log("token ", TOKEN);
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Barear ${TOKEN}` },
});
