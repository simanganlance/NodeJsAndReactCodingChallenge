function productDTO(product) {
    return {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
    };
  }
  
  module.exports = productDTO;
  