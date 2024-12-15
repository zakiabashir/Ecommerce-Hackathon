import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IoCartOutline } from 'react-icons/io5';

const CartIcon = () => {
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

  return (
    <div style={{ position: 'relative' }}>
      <span className='flex items-center gap-1 hover:text-gray-200 -ml-2'><IoCartOutline className='w-5 h-5' /></span>
      {totalQuantity > 0 && (
        <span
        style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            width: '18px', // Set width
            height: '18px', // Set height
            display: 'flex',
            alignItems: 'center', // Vertically center the text
            justifyContent: 'center', // Horizontally center the text
            fontSize: '12px', // Adjust font size to fit inside the circle
          }}
        >
          {totalQuantity}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
