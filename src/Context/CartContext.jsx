import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext();
const API_BASE_URL = "https://ecommerce.routemisr.com";
const headers = { token: localStorage.getItem("userToken") };

export default function CartContextProvider({ children }) {
  // Add a product to the cart
  const addProductToCart = async (productId) => {
    try {
      let response = await axios.post(
        `${API_BASE_URL}/api/v1/cart`,
        { productId },
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error during addProductToCart API call:", error);
      throw error;
    }
  };

  // Get the cart items
  const getCartItems = async () => {
    try {
      let response = await axios.get(`${API_BASE_URL}/api/v1/cart`, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Error during getCartItems API call:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ addProductToCart, getCartItems }}>
      {children}
    </CartContext.Provider>
  );
}
