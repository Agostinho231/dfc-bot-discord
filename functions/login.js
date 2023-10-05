const { API_USERNAME, API_PASSWORD } = process.env;
const axios = require("../axios");

const login = async () => {
  const data = {
    username: API_USERNAME,
    password: API_PASSWORD,
  };

  let response = await axios.post("/account/login", data);
  
  return response.data?.token;

};

module.exports = login
