const Product = require('../models/Product');

async function createProduct(productData) {
  return await Product.create(productData);
}

async function getProducts() {
  return await Product.find();
}

async function getProductById(productId) {
  return await Product.findById(productId);
}

async function updateProduct(productId, updatedData) {
  return await Product.findByIdAndUpdate(productId, updatedData, { new: true });
}

async function deleteProduct(productId) {
  return await Product.findByIdAndDelete(productId);
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
