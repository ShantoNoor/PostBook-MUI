import _axios from "axios";

const axios = _axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default axios;
