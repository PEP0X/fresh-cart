import axios from "axios";
import {createContext, useContext, useState} from "react";
import {userContext} from "./userContext.jsx";

export let CartContext = createContext();
const API_BASE_URL = "https://ecommerce.routemisr.com";
const headers = { token: localStorage.getItem("userToken") };

export default function CartContextProvider({ children }) {
    let [cartId, setCartId] = useState(null);
    let { userId } = useContext(userContext);
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

  // RemoveProduct
    const removeProduct = async (productId) => {
        try {
        let response = await axios.delete(`${API_BASE_URL}/api/v1/cart/${productId}`, {
            headers,
        });
        return response.data;
        } catch (error) {
        console.error("Error during removeProduct API call:", error);
        throw error;
        }
    };

    // updateCartItemQuantity
    const updateCartItemQuantity = async (productId, quantity) => {
        try {
            let response = await axios.put(
                `${API_BASE_URL}/api/v1/cart/${productId}`,
                { quantity },
                { headers }
            );
            return response.data;
        } catch (error) {
            console.error("Error during updateCartItemQuantity API call:", error);
            throw error;
        }
    };

    // CashOnDelivery
    const cashOnDelivery = async (url , shippingAddress) => {
        try {
            let response = await axios.post(url, {shippingAddress}, {headers});
            return response.data;
        } catch (error) {
            console.error("Error during CashOnDelivery API call:", error);
            throw error;
        }
    };
    // Get Orders
    const getOrders = async () => {
        try {
            let response = await axios.get(`${API_BASE_URL}/api/v1/orders/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error during getOrders API call:", error);
            throw error;
        }
    };
  
  return (
    <CartContext.Provider value={{ addProductToCart, getCartItems ,removeProduct ,updateCartItemQuantity ,cashOnDelivery ,cartId, setCartId ,getOrders }}>
      {children}
    </CartContext.Provider>
  );
}
