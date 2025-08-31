import axios from "axios";

const recordBaseUrl = axios.create({
  baseURL: "http://localhost:5000/record",
});

export default recordBaseUrl;
