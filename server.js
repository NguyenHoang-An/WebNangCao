const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Phục vụ file tĩnh từ thư mục "public"
app.use(express.static(path.join(__dirname, "public")));

// Kết nối MongoDB
connectDB();

// Routes API
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// Route chính để trả về index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "category.html"));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
