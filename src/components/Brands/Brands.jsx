import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { getBrands } from "../../utils/api";

const BrandPage = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await getBrands();
        setBrands(brandsData);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Brands</h1>
      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-infinity loading-lg h-[60vh]"></span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {brands.map((brand) => (
            <BrandCard
              key={brand._id}
              brand={brand}
              setSelectedBrand={setSelectedBrand}
            />
          ))}
        </div>
      )}
      <BrandModal
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
      />
    </div>
  );
};

const BrandCard = ({ brand, setSelectedBrand }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-md group">
      <img
        src={brand.image}
        alt={brand.name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
        <h3 className="text-white text-xl font-semibold mb-2">{brand.name}</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-4 py-2 rounded-md"
          onClick={() => setSelectedBrand(brand)}
        >
          See Details
        </motion.button>
      </div>
    </div>
  );
};

const BrandModal = ({ selectedBrand, setSelectedBrand }) => {
  return (
    <Dialog.Root
      open={!!selectedBrand}
      onOpenChange={() => setSelectedBrand(null)}
    >
      <AnimatePresence>
        {selectedBrand && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50"
              />
            </Dialog.Overlay>
            <Dialog.Content className="fixed inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <img
                  src={selectedBrand.image}
                  alt={selectedBrand.name}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <p className="text-gray-600 mb-4">
                  {selectedBrand.description}
                </p>
                <Dialog.Close asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-black text-white px-4 py-2 rounded-md"
                  >
                    Close
                  </motion.button>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default BrandPage;
