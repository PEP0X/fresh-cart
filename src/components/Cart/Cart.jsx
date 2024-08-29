import React, { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";

export default function Cart() {
  let { getCartItems } = useContext(CartContext);

  useEffect(() => {
    const getCartInfo = async () => {
      try {
        let cartItems = await getCartItems();
        console.log(cartItems);
      } catch (error) {
        console.error("Error during getCartInfo API call:", error);
      }
    };

    getCartInfo();
  });

  return <div className="text-lg text-emerald-600">Cart</div>;
}
