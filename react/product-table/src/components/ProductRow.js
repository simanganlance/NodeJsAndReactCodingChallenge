import React from 'react';

const ProductRow = ({ product, index, deleteProduct }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>
        <button onClick={() => deleteProduct(index)}>Delete</button>
      </td>
    </tr>
  );
};

export default ProductRow;
