import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../utils/api";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Rating } from "@mui/material";

export default function ProductDetails() {
  const { id } = useParams();
  const [ProductDetails, setProductDetails] = useState({});
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
  }, [id]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomPosition({ x, y });
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <section className="relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Part */}
          <div className="w-full max-w-md mx-auto">
            <Swiper
              pagination={{
                clickable: true,
                renderBullet: (index, className) => {
                  return `<div class="${className} w-16 h-16 opacity-60 hover:opacity-100 transition-opacity"><img src="${ProductDetails.images?.[index]}" class="w-full h-full object-cover rounded-md" /></div>`;
                },
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              {ProductDetails.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="relative overflow-hidden cursor-zoom-in aspect-square"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setZoomPosition({ x: 0, y: 0 })}
                  >
                    <img
                      src={image}
                      alt={`${ProductDetails.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundPosition: `${zoomPosition.x * 100}% ${
                          zoomPosition.y * 100
                        }%`,
                        backgroundSize: "200%",
                        opacity: zoomPosition.x !== 0 ? 1 : 0,
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Data Part */}
          <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
              <div className="data w-full max-w-xl">
                <p className="text-lg font-medium leading-8 text-green-600 mb-4">
                  {ProductDetails?.category?.name} &nbsp; /&nbsp;{" "}
                  {ProductDetails?.brand?.name}
                </p>
                <h2 className="font-Manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                  {ProductDetails.title}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                  <h6 className="font-Manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                    {ProductDetails.price} EGP
                  </h6>
                  <div className="flex items-center gap-2">
                    <Rating
                      name="read-only"
                      value={ProductDetails?.ratingsAverage ?? 0}
                      readOnly
                    />
                    <div className="badge badge-accent">
                      {ProductDetails?.ratingsAverage ?? 0}
                    </div>
                    <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">
                      {ProductDetails.ratingsQuantity} Review
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 text-base font-normal mb-5">
                  {ProductDetails.description}
                </p>

                <div className="flex items-center gap-3">
                  <button className="group transition-all duration-500 p-4 rounded-full bg-green-50 hover:bg-green-100 hover:shadow-sm hover:shadow-green-300">
                  <Heart />
                  </button>
                  <button className="text-center w-full px-5 py-4 rounded-[100px] bg-green-600 flex items-center justify-center gap-4 font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-green-700 hover:shadow-green-400">
                    <svg
                      className="stroke-white"
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                        stroke=""
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}














import React, { useState, useEffect } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "../Card/Card";
import { getProductDetails } from "../../utils/api";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [ProductDetails, setProductDetails] = useState({});
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
  }, []);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomPosition({ x, y });
  };

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % ProductDetails.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + ProductDetails.images.length) %
        ProductDetails.images.length
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <Card className="w-full max-w-4xl overflow-hidden">
        <div className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-square">
              {ProductDetails &&
              ProductDetails.images &&
              ProductDetails.images.length > 0 ? (
                <div
                  className="absolute inset-0 cursor-zoom-in"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setZoomPosition({ x: 0, y: 0 })}
                >
                  <img
                    src={ProductDetails.images[currentImageIndex]}
                    alt={`${ProductDetails.title} - Image ${
                      currentImageIndex + 1
                    }`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `url(${ProductDetails.images[currentImageIndex]})`,
                      backgroundPosition: `${zoomPosition.x * 100}% ${
                        zoomPosition.y * 100
                      }%`,
                      backgroundSize: "200%",
                      opacity: zoomPosition.x !== 0 ? 1 : 0,
                    }}
                  />
                </div>
              ) : (
                <p>Loading images...</p>
              )}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <button variant="outline" size="icon" onClick={prevImage}>
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button variant="outline" size="icon" onClick={nextImage}>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {ProductDetails.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {ProductDetails?.category?.name} /{" "}
                      {ProductDetails?.brand?.name}
                    </p>
                  </div>
                  {/*  */}
                  <span className="text-lg font-semibold badge">
                    ${ProductDetails.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  {ProductDetails.description}
                </p>
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(ProductDetails.ratingsAverage)
                            ? "text-yellow-900 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">
                    {ProductDetails.ratingsAverage}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({ProductDetails.ratingsQuantity} reviews)
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <button className="w-full" size="lg">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button variant="outline" size="icon" className="h-11 w-11">
                    <Heart className="h-4 w-4" />
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
