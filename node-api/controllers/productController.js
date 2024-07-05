// controllers/productController.js
const productService = require('../services/productService');
const Joi = require('joi');
const productDTO = require('../dtos/productDTO');

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(''),
  price: Joi.number().positive().required(),
});

async function createProduct(req, res, next) {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const product = await productService.createProduct(req.body);
    res.json(productDTO(product)); 
  } catch (err) {
    next(err);
  }
}

async function getProducts(req, res, next) {
  try {
    const products = await productService.getProducts();
    res.json(products.map(product => productDTO(product))); 
  } catch (err) {
    next(err);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(productDTO(product)); 
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const product = await productService.updateProduct(req.params.productId, req.body);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(productDTO(product)); 
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const product = await productService.deleteProduct(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
