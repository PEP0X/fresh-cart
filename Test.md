import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../Context/CartContext';

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
  })


  return (
    <div className='text-lg text-emerald-600'>
      Cart
    </div>
  )
}



I Wanna Make A Design of This page (Color Sceme : Green like fresh Cart Website) and it Should be cantains these things :
Total Price
number of Items 
table contains the products with {Image of product , Name of the Product , Price of product , Option to remove Product from the Cart , increase and decrease number of units of Same Product}
Clear Your Cart Button 

Make Sure That The Design Should Be Responsive and Clean And SOOOO Modern