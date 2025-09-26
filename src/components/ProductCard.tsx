import React from 'react';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-card__image"
      />
      <div className="product-card__body">
        <h2 className="product-card__title">{product.name}</h2>
        <p className="product-card__description">{product.description}</p>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
});

export default ProductCard;
