import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api",
});

http.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId")
  config.headers.Authorization = token ? token : "abc";
  config.headers.UserId = userId ? userId : "0"
  return config;
});

http.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response.status == 401) {
    localStorage.clear()
    window.location.assign("http://localhost:8080/");
  }
  return Promise.reject(error);
});

export default http;
