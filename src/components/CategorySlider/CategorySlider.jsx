import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


const categories = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Beauty",
  "Toys",
  "Books",
  "Automotive",
];

export function CategorySlider() {
  const [categoryIndex, setCategoryIndex] = useState(0);

  const nextCategory = () =>
    setCategoryIndex((prev) => (prev + 1) % (categories.length - 3));
  const prevCategory = () =>
    setCategoryIndex(
      (prev) => (prev - 1 + categories.length - 3) % (categories.length - 3)
    );

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-800">Categories</h2>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${categoryIndex * 25}%)` }}
        >
          {categories.map((category, index) => (
            <div key={index} className="w-1/4 flex-shrink-0 px-2">
              <div className="bg-white text-green-600 rounded-lg p-4 text-center shadow-md hover:bg-green-100 transition-colors duration-200">
                {category}
              </div>
            </div>
          ))}
        </div>
        <button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-green-600 hover:bg-green-100"
          onClick={prevCategory}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-green-600 hover:bg-green-100"
          onClick={nextCategory}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
