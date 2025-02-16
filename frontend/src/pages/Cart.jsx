import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import Loader from './Loader';
import { fetchCart, deleteItem, placeOrder, calculateTotal } from '../store/cartActions';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    } else {
      dispatch(fetchCart());
    }
  }, [isLoggedIn, navigate, dispatch]);

  useEffect(() => {
    dispatch(calculateTotal(cart));
  }, [cart, dispatch]);

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  const handlePlaceOrder = () => {
    dispatch(placeOrder(cart));
    navigate('/profile/orderHistory');
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8">
      {!cart && <Loader />}
      {cart && cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Cart
            </h1>
            <img
              src="/empty-cart.png"
              alt="empty cart"
              className="lg:h-[50vh]"
            />
          </div>
        </div>
      )}
      {cart && cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>
          {cart.map((item, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={i}
            >
              <img
                src={item.url}
                alt="/"
                className="h-[20vh] md:h-[10vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {item.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {item.desc.slice(0, 100)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                  {item.desc.slice(0, 65)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                  {item.desc.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  ₹ {item.price}
                </h2>
                <button
                  className="bg-red-100 text-red-700 border border-red-700 hover:text-white hover:bg-red-700 hover:border-white transition-colors duration-300 rounded p-2 ms-12"
                  onClick={() => handleDeleteItem(item._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <h1 className="text-3xl text-zinc-200 font-semibold">
                Total Amount
              </h1>
              <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                <h2>{cart.length} books</h2>
                <h2>₹ {total}</h2>
              </div>
              <div className="w-[100%] mt-3">
                <button
                  className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200"
                  onClick={handlePlaceOrder}
                >
                  Place your order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;