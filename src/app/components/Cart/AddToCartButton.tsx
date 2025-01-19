import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/redux/cartSlice';
import { toast } from 'react-toastify';
import { FaYahoo, FaShoppingCart } from 'react-icons/fa';

interface AddToCartButtonProps {
  showText?: boolean;
  product: {
    _id?: string;
    productName?: string;
    price?: number;
    productImage?: string;
    size?: string;
    colors?: string[];
    stock?: number;
  };
  selectedColor?: string;
}

const AddToCartButton = ({ showText, product, selectedColor }: AddToCartButtonProps) => {
  const dispatch = useDispatch();
  const [currentStock, setCurrentStock] = useState(product.stock ?? 0);

if (product.stock === undefined) {
  console.warn('Stock information is missing for product:', product);
}

  const isOutOfStock = currentStock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error('Sorry, this product is out of stock!');
      return;
    }

    const productWithQuantity = {
      ...product,
      quantity: 1,
      productImage: product.productImage || '',
      colors: selectedColor ? [selectedColor] : [],
      size: product.size || '',
      productName: product.productName || '',
      price: product.price || 0,
      stock: currentStock,
      _id: product._id || '',
      totalQuantity: 1,
    };

    dispatch(addToCart(productWithQuantity));
    setCurrentStock((prevStock) => prevStock - 1); // Reduce stock dynamically

    toast.success(
      <div className="flex items-center space-x-4">
        <FaYahoo size={24} className="text-[#FB2E86]" />
        <div>
          <h4 className="font-semibold text-lg text-green-500">Success! 🎉</h4>
          <p className="text-sm text-gray-200">
            You added <strong>{product.productName}</strong> to your cart! 🛒
          </p>
        </div>
      </div>,
      {
        autoClose: 2000,
        position: 'bottom-right',
        className: 'bg-gray-900 text-white rounded-lg shadow-lg',
        theme: 'dark',
      }
    );
  };

  return (
    <div className="flex items-center justify-between p-4 ">
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
          isOutOfStock
            ? 'text-gray-600 cursor-not-allowed'
            : 'text-indigo-500 hover:text-white'
        }`}
      >
        {showText ? (
          'Add to Cart'
        ) : (
          <FaShoppingCart size={20} className="" />
        )}
      </button>

      {/* Stock Information (shown only if showText is true) */}
      {showText && (
        <span
          className={`ml-4 text-sm font-semibold ${
            currentStock > 0 ? 'text-green-600' : 'text-red-800'
          }`}
        >
          {currentStock > 0 ? `In Stock: ${currentStock}` : 'Out of Stock'}
        </span>
      )}
    </div>
  );
};

export default AddToCartButton;