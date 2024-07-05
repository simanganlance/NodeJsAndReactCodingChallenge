import React from 'react';

const ProductForm = ({ newProduct, handleInputChange, addProduct }) => {
  return (
    <form onSubmit={addProduct}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newProduct.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={newProduct.description}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={newProduct.price}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
