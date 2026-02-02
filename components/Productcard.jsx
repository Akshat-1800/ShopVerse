"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProductCard({ product }) {
  const router = useRouter();

  // 🔴 PLACEHOLDER — you will replace this with NextAuth later
  let isLoggedIn = false; // <-- change later
  const { data: session } = useSession();
  if (session) {
    console.log("User session:", session);
    isLoggedIn = true;
  }

  const handleClick = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/product");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer card-hover border border-slate-100"
    >
      <div className="relative h-48 w-full bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
        {/* Sale Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
            SALE
          </span>
        </div>
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-50 transition-colors">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 min-h-[40px] group-hover:text-indigo-600 transition-colors">
          {product.title}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {product.price}
          </p>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <span className="text-sm text-slate-500">4.5</span>
          </div>
        </div>

        <button className="mt-4 w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:from-indigo-600 hover:to-purple-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
