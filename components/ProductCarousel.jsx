"use client"

import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import ProductCard from "./Productcard"
import { useRef } from "react"

const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: "₹2,999",
    image: "/products/next.svg",
  },
  {
    id: 2,
    title: "Smart Watch",
    price: "₹4,499",
    image: "/products/next.svg",
  },
  {
    id: 3,
    title: "Bluetooth Speaker",
    price: "₹1,999",
    image: "/products/next.svg",
  },
  {
    id: 4,
    title: "Gaming Mouse",
    price: "₹1,299",
    image: "/products/next.svg",
  },
  {
    id: 5,
    title: "Mechanical Keyboard",
    price: "₹3,999",
    image: "/products/next.svg",
  },
]

export default function ProductCarousel() {
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
    },
(emblaRoot) => emblaRoot.parentElement)
  )

  return (
    <div className="relative px-4 sm:px-0">
      <Carousel
        plugins={[autoplay.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        onMouseEnter={() => autoplay.current.stop()}
        onMouseLeave={() => autoplay.current.reset()}
      >
        <CarouselContent className="-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Modern Navigation Arrows */}
        <CarouselPrevious className="hidden md:flex -left-4 lg:-left-6 w-12 h-12 bg-white border-2 border-slate-200 shadow-lg hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300" />
        <CarouselNext className="hidden md:flex -right-4 lg:-right-6 w-12 h-12 bg-white border-2 border-slate-200 shadow-lg hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300" />
      </Carousel>

      {/* Mobile Scroll Indicator */}
      <div className="flex justify-center mt-4 md:hidden">
        <div className="flex gap-1">
          {products.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-slate-300"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
