// routes/productRouter.js
const express = require("express");
const Product = require("../models/product");

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find(); // You can add pagination later
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;
