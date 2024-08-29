import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { FaTrash, FaPlus, FaMinus, FaHeart, FaShoppingCart } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { getCartItems, removeProduct, updateCartItemQuantity, setCartId, cartId } = useContext(CartContext);
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartInfo = async () => {
      try {
        setLoading(true);
        const cartItems = await getCartItems();
        setCartId(cartItems.data._id);
        setCartData(cartItems);
      } catch (error) {
        console.error("Error fetching cart info:", error);
        toast.error("Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCartInfo();
  }, [getCartItems]);

  const handleRemoveItem = async (productId) => {
    try {
      setRemoving(true);
      toast.loading('Removing item...');
      let res = await removeProduct(productId);
      toast.dismiss();
      toast.success('Item removed from cart');
      const updatedCart = await getCartItems();
      setCartData(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
      toast.dismiss();
      toast.error('Failed to remove item');
    } finally {
      setRemoving(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      let res = await updateCartItemQuantity(productId, newQuantity);
      const updatedCart = await getCartItems();
      setCartData(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error('Failed to update quantity');
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setCartData(null);
      toast.success('Cart cleared successfully');
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error('Failed to clear cart');
    }
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg text-emerald-600"></span>
        </div>
    );
  }

  if (!cartData || cartData.data.products.length === 0) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-screen bg-white"
        >
          <FaShoppingCart className="text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Cart is Empty</h2>
          <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg focus:ring-4 focus:ring-emerald-200 hover:bg-emerald-800"
          >
            Go to Home
          </button>
        </motion.div>
    );
  }

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white py-8 antialiased md:py-16"
      >
        <Toaster position="top-center" reverseOrder={false} toastOptions={{ className: 'mt-16' }} />
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-bold text-dark-green text-center font-Manrope sm:text-3xl">Shopping Cart</h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cartData?.data?.products.map((item) => (
                    <div key={item._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <div className="shrink-0 md:order-1 md:w-32 md:h-32">
                          <img
                              className="w-full h-full object-cover rounded-lg"
                              src={item.product.imageCover}
                              alt={item.product.title}
                          />
                        </div>

                        <label htmlFor={`counter-input-${item._id}`} className="sr-only">Choose quantity:</label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <button
                                type="button"
                                onClick={() => handleUpdateQuantity(item.product.id, item.count - 1)}
                                disabled={item.count <= 1}
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                            >
                              <FaMinus className="h-2.5 w-2.5 text-gray-900" />
                            </button>
                            <input
                                type="text"
                                id={`counter-input-${item._id}`}
                                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                                placeholder=""
                                value={item.count}
                                readOnly
                            />
                            <button
                                type="button"
                                onClick={() => handleUpdateQuantity(item.product.id, item.count + 1)}
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                            >
                              <FaPlus className="h-2.5 w-2.5 text-gray-900" />
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900">${item.price}</p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a href="#" className="text-base font-medium text-gray-900 hover:underline">{item.product.title}</a>

                          <div className="flex items-center gap-4">
                            <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline">
                              <FaHeart className="me-1.5 h-5 w-5" />
                              Add to Favorites
                            </button>

                            <button type="button" onClick={() => handleRemoveItem(item.product.id)} className="inline-flex items-center text-sm font-medium text-red-600 hover:underline">
                              <FaTrash className="me-1.5 h-5 w-5" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <p className="text-xl font-semibold text-gray-900">Order summary</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">Total Items</dt>
                      <dd className="text-base font-medium text-green-600">{cartData.numOfCartItems}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">Original price</dt>
                      <dd className="text-base font-medium text-gray-900">${cartData?.data?.totalCartPrice || 0}</dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">${cartData?.data?.totalCartPrice || 0}</dd>
                  </dl>
                </div>

                <Link to={`/checkout/${cartId}`} className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300">Proceed to Checkout</Link>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500"> or </span>
                  <Link to="/" title="" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 underline hover:no-underline">
                    Continue Shopping
                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
  );
}