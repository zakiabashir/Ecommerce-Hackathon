// SearchBar.tsx
import React, { useState, useEffect } from 'react';
import { ProductType } from './ProductType'; // Import from the central type definition

interface SearchBarProps {
  products: ProductType[];
  onSearch: (searchedProducts: ProductType[]) => void;
  onProductSelect: (product: ProductType) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ products, onSearch, onProductSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.productName.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    onSearch(filtered);
  }, [searchTerm, products, onSearch]);

  const handleProductClick = (product: ProductType) => {
    onProductSelect(product); // Trigger the onProductSelect function
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product._id} onClick={() => handleProductClick(product)}>
            {product.productName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
