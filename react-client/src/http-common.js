import axios from "axios";

export default axios.create({
  baseURL: 'http://54.204.118.151:8010/api',
  headers: {
    "Content-type": "application/json"
  }
});

