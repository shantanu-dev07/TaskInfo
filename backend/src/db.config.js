const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);

    console.log(`DB connected with ${db.connection.host}`.bgGreen);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    await mongoose.disconnect();
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;