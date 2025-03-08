const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://annguyen1212004:12345An@shoppingdb.fz3z9.mongodb.net/");
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB; // <-- Dùng CommonJS (require)
