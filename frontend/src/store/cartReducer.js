const initialState = {
    cart: [],
    total: 0,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CART':
        return {
          ...state,
          cart: action.payload,
        };
      case 'SET_TOTAL':
        return {
          ...state,
          total: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;