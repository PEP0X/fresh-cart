import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const offers = [
  { id: 1, title: "Special Offer 1", color: "bg-green-500" },
  { id: 2, title: "Special Offer 2", color: "bg-green-600" },
  { id: 3, title: "Special Offer 3", color: "bg-green-700" },
];

export function LargeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % offers.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);

  return (
    <div className="relative overflow-hidden rounded-lg mb-8">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`w-full flex-shrink-0 h-96 ${offer.color} flex items-center justify-center text-white text-4xl`}
          >
            {offer.title}
          </div>
        ))}
      </div>
      <button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-green-600 hover:bg-green-100 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-green-600 hover:bg-green-100 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
