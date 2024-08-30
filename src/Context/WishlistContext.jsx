// In `src/Context/WishlistContext.jsx`
import axios from "axios";
import { createContext, useState } from "react";

export let WishlistContext = createContext();
const API_BASE_URL = "https://ecommerce.routemisr.com";
const headers = { token: localStorage.getItem("userToken") };

export default function WishlistContextProvider({ children }) {
    let [wishlistItemsNo, setWishlistItemsNo] = useState(0);

    // Add a product to the wishlist
    const addProductToWishlist = async (productId) => {
        try {
            let response = await axios.post(
                `${API_BASE_URL}/api/v1/wishlist`,
                { productId },
                { headers }
            );
            setWishlistItemsNo((prev) => prev + 1);
            return response.data;
        } catch (error) {
            console.error("Error during addProductToWishlist API call:", error);
            throw error;
        }
    };

    // Get the wishlist items
    const getWishlistItems = async () => {
        try {
            let response = await axios.get(`${API_BASE_URL}/api/v1/wishlist`, {
                headers,
            });
            setWishlistItemsNo(response.data.count);
            return response.data;
        } catch (error) {
            console.error("Error during getWishlistItems API call:", error);
            throw error;
        }
    };

    // Remove a product from the wishlist
    const removeProductFromWishlist = async (productId) => {
        try {
            let response = await axios.delete(`${API_BASE_URL}/api/v1/wishlist/${productId}`, {
                headers,
            });
            setWishlistItemsNo((prev) => prev - 1);
            return response.data;
        } catch (error) {
            console.error("Error during removeProductFromWishlist API call:", error);
            throw error;
        }
    };

    return (
        <WishlistContext.Provider value={{
            wishlistItemsNo, setWishlistItemsNo,
            addProductToWishlist, getWishlistItems,
            removeProductFromWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
}