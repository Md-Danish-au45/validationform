const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

module.exports = db;
