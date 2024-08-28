import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRelatedProducts } from "../../utils/api";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { Rating } from "@mui/material";

export default function RelatedProduct({ categoryType }) {
  const [RealatedProduct, setRealatedProduct] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const [addedToCart, setAddedToCart] = useState({});
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const RealatedProductData = await getRelatedProducts(categoryType);
        console.log(categoryType);

        setRealatedProduct(RealatedProductData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProductDetails();
  }, []);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const handleAddToCart = (productId) => {
    setAddedToCart((prev) => ({ ...prev, [productId]: true }));
    // Add your cart logic here
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "bg-green-100 text-green-800";
    if (rating >= 4) return "bg-lime-100 text-lime-800";
    if (rating >= 3) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        Related Products to {categoryType}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {RealatedProduct.map((product) => (
          <div
            key={product.id}
            className="w-full flex flex-col justify-between max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl"
          >
            <div className="relative">
              <Link
                to={`/productdetails/${product.category.name}/${product.id}`}
              >
                <img
                  className="p-3 rounded-t-lg image-full"
                  src={product.imageCover}
                  alt={product.title}
                />
              </Link>
              <motion.button
                className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md"
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleWishlist(product.id)}
                aria-label={
                  wishlist[product.id]
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                <motion.div
                  animate={{
                    scale: wishlist[product.id] ? [1, 1.2, 1] : 1,
                    color: wishlist[product.id] ? "#ef4444" : "#000000",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart className="w-6 h-6" />
                </motion.div>
              </motion.button>
            </div>
            <div className="px-5 pb-5">
              <h5 className="text-md font-thin tracking-tight text-dark-green">
                {product.category.name}
              </h5>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                {product.title.length > 30
                  ? `${product.title.slice(0, 30)}...`
                  : product.title}
              </h5>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Rating
                    name="read-only"
                    precision={0.5}
                    value={product.ratingsAverage}
                    readOnly
                  />
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded ${getRatingColor(
                      product.ratingsAverage
                    )}`}
                  >
                    {product.ratingsAverage}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">
                  {product.price} <span className="text-2xl">EGP</span>
                </span>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.button
                    className="relative flex items-center justify-center w-36 h-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 overflow-hidden"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={addedToCart[product.id]}
                    aria-label={
                      addedToCart[product.id] ? "Added to cart" : "Add to cart"
                    }
                  >
                    <AnimatePresence mode="wait">
                      {!addedToCart[product.id] ? (
                        <motion.div
                          key="add"
                          className="flex items-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Add to cart
                        </motion.div>
                      ) : (
                        <motion.div
                          key="added"
                          className="flex items-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="w-5 h-5 mr-2" />
                          Added!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
