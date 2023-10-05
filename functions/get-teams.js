const axios = require("../axios");

const getTeams = async (TOKEN) => {
  const response = await axios.get("/teamdraw", {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data
};

module.exports = getTeams;
