import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
        if (cartItem && cartItem.price && cartItem.description && cartItem.imageUrl) {
            temp += parseInt(cartItem.price) * cartItem.quantity; // Multiply price by quantity
        }
    });
    setTotalAmount(temp);
  }, [cartItems]);

  var shipping = parseInt(0);

  if ((totalAmount > 0) && (totalAmount <= 300)) {
      shipping = 100;
  }
  var grandTotal = shipping + totalAmount;


  const deleteCart = (item) => {
    console.log("Delete Attempted",item);
    dispatch(deleteFromCart(item))
    toast.success('Item Deleted');
  }

  const addCart = (product) => {
    dispatch(addToCart(product))
    toast.success('Added to Cart');
}

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="h-screen bg-gray-100 pt-5 " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3 ">
            {cartItems.map((item, index) => {
              if (item && item.id && item.price && item.description && item.imageUrl) {
                return (
                  <div key={index} className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}>
                    <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                        <h2 className="text-sm text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</h2>
                        <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{item.price}</p>
                      </div>
                      <div className='flex ml-6 flex-col space-between'>
                        <div className='ml-2 mb-10'>
                          {item.quantity}
                        </div>

                        <div onClick={() => addCart(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
                        </div>

                        <div onClick={() => deleteCart(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg>
                        </div>
                        
                        
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null; // Return null for items with missing parameters to avoid errors
              }
            })}
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
              <div>
                <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{grandTotal}</p>
              </div>
            </div>
            <Modal />
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Cart;
