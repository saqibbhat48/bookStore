import { toast } from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

// Action types
export const SET_CART = 'SET_CART';
export const SET_TOTAL = 'SET_TOTAL';

// Action creators
export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total,
});

// Fetch cart from the server
export const fetchCart = () => async (dispatch) => {
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  try {
    const res = await axiosInstance.get('/get-user-cart', { headers })
    dispatch(setCart(res.data.data));
  } catch (error) {
    console.error('Error fetching cart:', error);
    toast.error('Failed to fetch cart');
  }
};

// Delete item from the cart
export const deleteItem = (id) => async (dispatch) => {
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  try {
    const response = await axiosInstance.put(`/remove-from-cart/${id}`,
      {},
      { headers })
    toast.success(response.data.message);
    dispatch(fetchCart()); // Refresh the cart after deletion
  } catch (error) {
    console.error('Error deleting item:', error);
    toast.error('Failed to delete item');
  }
};

// Place order
export const placeOrder = (cart) => async (dispatch) => {
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  try {
    const response = await axiosInstance.post('/place-order',
      { order: cart },
      { headers })
    toast.success(response.data.message);
    dispatch(setCart([])); // Clear the cart after placing the order
  } catch (error) {
    console.error('Error placing order:', error);
    toast.error('Failed to place order');
  }
};

// Calculate total
export const calculateTotal = (cart) => (dispatch) => {
  if (cart && cart.length > 0) {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    dispatch(setTotal(total));
  } else {
    dispatch(setTotal(0));
  }
};