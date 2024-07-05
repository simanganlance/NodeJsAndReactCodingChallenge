import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import './ProductTable.css';

const ProductTable = () => {
  // State to manage the list of products with an initial product
  const [products, setProducts] = useState([]);

  // State to manage the new product form
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });

  // Handle input changes for the new product form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      // Check if value is not a number or is less than 0
      if (isNaN(value) || Number(value) < 0) {
        return;
      }
    }

    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  // Add a new product to the list
  const addProduct = (e) => {
    e.preventDefault();
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setNewProduct({ name: '', description: '', price: '' }); // Reset form
  };

  // Delete a product from the list
  const deleteProduct = (index) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  return (
    <div className="product-table">
      <h1>Product Table</h1>
      <ProductForm 
        newProduct={newProduct}
        handleInputChange={handleInputChange}
        addProduct={addProduct}
      />
      <ProductList 
        products={products}
        deleteProduct={deleteProduct}
      />
    </div>
  );
};

export default ProductTable;
