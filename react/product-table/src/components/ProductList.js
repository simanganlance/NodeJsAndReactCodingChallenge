import React from 'react';
import ProductRow from './ProductRow';

const ProductList = ({ products, deleteProduct }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <ProductRow 
            key={index} 
            product={product} 
            index={index} 
            deleteProduct={deleteProduct} 
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
