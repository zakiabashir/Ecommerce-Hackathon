import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IoCartOutline } from 'react-icons/io5';
import Link from 'next/link';

const CartIcon = () => {
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

  return (
    <div style={{ position: 'relative' }}>
    {/* <Link href="/pages/cart/cartPage"> */}
      <span className='flex items-center gap-1 hover:text-gray-200 -ml-2 z-[999]'>
        <IoCartOutline className='w-5 h-5' />
    
        </span>
    {/* </Link> */}
      {totalQuantity > 0 && (
        <span
        style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
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
