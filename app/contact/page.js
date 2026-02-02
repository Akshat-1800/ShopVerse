import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-linear-to-r from-blue-600 to-purple-600 px-8 py-10 text-white">
            <h1 className="text-4xl font-bold mb-2">Get In Touch</h1>
            <p className="text-blue-100 text-lg">
              We'd love to hear from you. Reach out through any of these channels.
            </p>
          </div>

          {/* Contact Information */}
          <div className="px-8 py-10">
            <ul className="space-y-6">
              {/* Email */}
              <li className="flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                <div className="f w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Email</p>
                  <a href="mailto:test@gmail.com" className="text-lg font-medium text-slate-900 hover:text-blue-600 transition-colors">
                    test@gmail.com
                  </a>
                </div>
              </li>

              {/* Phone */}
              <li className="flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                <div className="shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="tlex-shrink-0ext-sm font-semibold text-slate-500 mb-1">Phone</p>
                  <a href="tel:1234567890" className="text-lg font-medium text-slate-900 hover:text-green-600 transition-colors">
                    1234567890
                  </a>
                </div>
              </li>

              {/* Instagram */}
              <li className="flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                <div className="shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Instagram</p>
                  <Link
                    href="https://www.instagram.com/testinsta"
                    target="_blank"
                    className="text-lg font-medium text-slate-900 hover:text-pink-600 transition-colors"
                  >
                    @testinsta
                  </Link>
                </div>
              </li>

              {/* Twitter */}
              <li className="flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                <div className="shrink-0 w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Twitter</p>
                  <Link
                    href="https://twitter.com/testtwitter"
                    target="_blank"
                    className="text-lg font-medium text-slate-900 hover:text-sky-600 transition-colors"
                  >
                    @testtwitter
                  </Link>
                </div>
              </li>

              {/* Address */}
              <li className="flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                <div className="shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Address</p>
                  <p className="text-lg font-medium text-slate-900">
                    123 Main St, Anytown, USA
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
