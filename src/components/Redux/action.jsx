export const addToCart = (service) => {
  return {
    type: "ADD_TO_CART",
    payload: service,
  };
};

export const removeFromCart = (service) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: service,
  };
};

export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};
