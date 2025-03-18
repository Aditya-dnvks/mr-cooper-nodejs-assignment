const mongoose = require("mongoose");

const mongoDBConnection = async (url) => {
  try {
    const dbConnection = await mongoose.connect(url);

    console.log(
      "Database connected successfully",
      dbConnection.connection.host
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoDBConnection;
