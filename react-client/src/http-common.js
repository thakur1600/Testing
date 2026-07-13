import axios from "axios";

export default axios.create({
  baseURL: 'http://100.25.219.91:8010/api',
  headers: {
    "Content-type": "application/json"
  }
});

