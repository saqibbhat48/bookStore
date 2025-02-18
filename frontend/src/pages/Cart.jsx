import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import Loader from "./Loader";
import { fetchCart, deleteItem, placeOrder, calculateTotal } from "../store/cartActions";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
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
    navigate("/profile/orderHistory");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4 sm:px-8 py-8">
      {!cart && <Loader />}
      {cart && cart.length === 0 && (
        <div className="h-screen flex flex-col items-center justify-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-400 mb-8">
            Your Cart is Empty
          </h1>
          <img
            src="/empty-cart.png"
            alt="Empty Cart"
            className="w-64 sm:w-80 object-contain"
          />
        </div>
      )}
      {cart && cart.length > 0 && (
        <>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-500 mb-8">
            Your Cart
          </h1>
          <div className="space-y-6">
            {cart.map((item, i) => (
              <div
                key={i}
                className="w-full bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
              >
                {/* Book Image */}
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-32 h-32 sm:w-24 sm:h-24 object-cover rounded-lg"
                />

                {/* Book Details */}
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-white">
                    {item.title}
                  </h2>
                  <p className="text-gray-300 mt-2 text-sm sm:text-base">
                    {item.desc.slice(0, 100)}...
                  </p>
                </div>

                {/* Price and Delete Button */}
                <div className="flex items-center gap-6">
                  <h3 className="text-2xl font-semibold text-white">
                    ₹ {item.price}
                  </h3>
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="bg-red-100 text-red-700 border border-red-700 hover:text-white hover:bg-red-700 hover:border-white transition-colors duration-300 rounded p-2 ms-12"
                  >
                    <AiFillDelete className="text-2xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Amount and Place Order Button */}
          <div className="w-full flex  items-center justify-center md:justify-end">
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 ">
            <h2 className="text-2xl font-bold text-white mb-4">
              Order Summary
            </h2>
            <div className="flex items-center justify-between text-gray-300 text-lg">
              <p>{cart.length} books</p>
              <p>₹ {total}</p>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 px-6 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Place Your Order
            </button>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;