import React, { useState, useEffect } from "react";

import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../Card/Card";
import { getProductDetails } from "../../utils/api";
import { useParams } from "react-router-dom";
import RelatedProduct from "../RelatedProduct/RelatedProduct";

export default function ProductDetails() {
  const { category, id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetailsData = await getProductDetails(id);
        setProductDetails(productDetailsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProductDetails();
  }, [id, category]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomPosition({ x, y });
  };

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % productDetails.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + productDetails.images.length) %
        productDetails.images.length
    );
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4 font-Manrope">
      <Card className="w-full max-w-5xl overflow-hidden mb-8">
        <div className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative">
              <div className="aspect-square overflow-hidden">
                {productDetails &&
                productDetails.images &&
                productDetails.images.length > 0 ? (
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 cursor-zoom-in"
                      onMouseMove={handleMouseMove}
                      onMouseLeave={() => setZoomPosition({ x: 0, y: 0 })}
                    >
                      <img
                        src={productDetails.images[currentImageIndex]}
                        alt={`${productDetails.title} - Image ${
                          currentImageIndex + 1
                        }`}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: `url(${productDetails.images[currentImageIndex]})`,
                          backgroundPosition: `${zoomPosition.x * 100}% ${
                            zoomPosition.y * 100
                          }%`,
                          backgroundSize: "200%",
                          opacity: zoomPosition.x !== 0 ? 1 : 0,
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <p>Loading images...</p>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex justify-between items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevImage}
                  className="text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
                >
                  <ChevronLeft className="h-6 w-6" />
                </motion.button>
                <div className="text-white text-sm">
                  {currentImageIndex + 1} / {productDetails.images?.length}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextImage}
                  className="text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
                >
                  <ChevronRight className="h-6 w-6" />
                </motion.button>
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-md text-green-700">
                      {productDetails?.category?.name} /{" "}
                      {productDetails?.brand?.name}
                    </p>
                    <h2 className="text-2xl font-bold">
                      {productDetails.title}
                    </h2>
                  </div>
                  <span className="text-xl font-semibold">
                    {productDetails.price}&nbsp;EGP
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  {productDetails.description}
                </p>
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={22}
                        className={`${
                          i < Math.floor(productDetails.ratingsAverage)
                            ? "text-yellow-900 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium badge badge-outline text-green-700">
                    {productDetails.ratingsAverage}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({productDetails.ratingsQuantity} reviews)
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-light-green text-white hover:bg-green-500 h-11 px-4 py-2 rounded-md inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-11 w-11 border border-input border-black hover:text-accent-foreground rounded-md inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  <Heart className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      {/* Related Products */}
      <RelatedProduct categoryType={category} />
    </div>
  );
}
