const mongoose = require("mongoose");

module.exports = connect = async () => {
  return await mongoose.connect(process.env.URL);
};
