const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "secretKey", resave: false, saveUninitialized: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Kết nối MongoDB thành công"))
.catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));

// Routes API
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Routes Frontend
app.get("/", (req, res) => {
  res.render("index", { title: "Trang chủ" });
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("products", { title: "Danh sách sản phẩm", products });
  } catch (error) {
    res.status(500).send("Lỗi tải danh sách sản phẩm");
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Sản phẩm không tồn tại");
    res.render("productDetail", { title: product.name, product });
  } catch (error) {
    res.status(500).send("Lỗi tải chi tiết sản phẩm");
  }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
