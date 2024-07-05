const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const productController = require('../controllers/productController');
const productService = require('../services/productService');
const productDTO = require('../dtos/productDTO');
const app = express();

app.use(bodyParser.json());
app.post('/api/products', productController.createProduct);
app.get('/api/products', productController.getProducts);
app.get('/api/products/:productId', productController.getProductById);
app.put('/api/products/:productId', productController.updateProduct);
app.delete('/api/products/:productId', productController.deleteProduct);

describe('Product Controller', () => {
  describe('POST /api/products', () => {
    it('should create a new product (positive case)', async () => {
      const newProduct = { name: 'Product A', description: 'Description A', price: 100 };
      spyOn(productService, 'createProduct').and.returnValue(Promise.resolve(newProduct));

      const res = await request(app).post('/api/products').send(newProduct);

      expect(res.status).toBe(200);
      expect(res.body.name).toEqual(newProduct.name);
      expect(res.body.description).toEqual(newProduct.description);
      expect(res.body.price).toEqual(newProduct.price);
    });

    it('should return validation error for missing name (negative case)', async () => {
      const invalidProduct = { description: 'Description B', price: 200 };

      const res = await request(app).post('/api/products').send(invalidProduct);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('"name" is required');
    });

    it('should return validation error for negative price (negative case)', async () => {
      const invalidProduct = { name: 'Product C', description: 'Description C', price: -50 };

      const res = await request(app).post('/api/products').send(invalidProduct);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('"price" must be a positive number');
    });
  });

  describe('GET /api/products', () => {
    it('should return all products (positive case)', async () => {
      const products = [
        { _id: '1', name: 'Product A', description: 'Description A', price: 100 },
        { _id: '2', name: 'Product B', description: 'Description B', price: 200 },
      ];
      spyOn(productService, 'getProducts').and.returnValue(Promise.resolve(products));

      const res = await request(app).get('/api/products');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(products.map(productDTO));
    });
  });

  describe('GET /api/products/:productId', () => {
    it('should return a product by id (positive case)', async () => {
      const product = { _id: '1', name: 'Product A', description: 'Description A', price: 100 };
      spyOn(productService, 'getProductById').and.returnValue(Promise.resolve(product));

      const res = await request(app).get('/api/products/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(productDTO(product));
    });

    it('should return 404 if product not found (negative case)', async () => {
      spyOn(productService, 'getProductById').and.returnValue(Promise.resolve(null));

      const res = await request(app).get('/api/products/999');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Product not found');
    });
  });

  describe('PUT /api/products/:productId', () => {
    it('should update a product (positive case)', async () => {
      const updatedProduct = { _id: '1', name: 'Product A', description: 'Updated Description', price: 150 };
      spyOn(productService, 'updateProduct').and.returnValue(Promise.resolve(updatedProduct));

      const res = await request(app).put('/api/products/1').send({
        name: 'Product A',
        description: 'Updated Description',
        price: 150
      });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(productDTO(updatedProduct));
    });

    it('should return validation error for negative price (negative case)', async () => {
      const invalidProduct = { name: 'Product C', description: 'Description C', price: -50 };

      const res = await request(app).put('/api/products/1').send(invalidProduct);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('"price" must be a positive number');
    });

    it('should return 404 if product not found (negative case)', async () => {
      spyOn(productService, 'updateProduct').and.returnValue(Promise.resolve(null));

      const res = await request(app).put('/api/products/999').send({
        name: 'Product D',
        description: 'Description D',
        price: 200
      });

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Product not found');
    });
  });

  describe('DELETE /api/products/:productId', () => {
    it('should delete a product (positive case)', async () => {
      const product = { _id: '1', name: 'Product A', description: 'Description A', price: 100 };
      spyOn(productService, 'deleteProduct').and.returnValue(Promise.resolve(product));

      const res = await request(app).delete('/api/products/1');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Product deleted successfully');
    });

    it('should return 404 if product not found (negative case)', async () => {
      spyOn(productService, 'deleteProduct').and.returnValue(Promise.resolve(null));

      const res = await request(app).delete('/api/products/999');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Product not found');
    });
  });
});
