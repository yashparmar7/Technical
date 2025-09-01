import axios from "axios";

const BASE_URL =
  import.meta.env.MODE == "development"
    ? "http://localhost:5000/record"
    : "/record";

const recordBaseUrl = axios.create({
  baseURL: BASE_URL,
});

export default recordBaseUrl;
