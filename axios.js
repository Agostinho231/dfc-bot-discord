const Axios = require("axios")
const { API_URL} = process.env;


const axios = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

module.exports = axios;
