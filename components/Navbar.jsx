  "use client";

  import Link from "next/link";
  import React, { useState, useEffect, useRef } from "react";
  import { useSession, signOut } from "next-auth/react";
  import { useRouter } from "next/navigation";

  const Navbar = () => {
    const { data: session, status } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const dropdownRef = useRef(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsUserDropdownOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    // Fetch user details when authenticated
    useEffect(() => {
      if (session?.user?.email) {
        fetchUserDetails();
      }
    }, [session]);

    const fetchUserDetails = async () => {
      try {
        const response = await fetch('/api/auth/user-details',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data.user);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const handleAccountClick = () => {
      setIsUserDropdownOpen(false);
      router.push('/account');
    };

    return (
      <nav className="sticky top-0 z-50 glass border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:block">ShopVerse</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="px-4 py-2 text-slate-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200">
                Home
              </Link>
              <Link href="/product" className="px-4 py-2 text-slate-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200">
                Products
              </Link>
              <Link href="/about" className="px-4 py-2 text-slate-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200">
                About
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              {/* Orders Icon - Only for authenticated users */}
              {status === "authenticated" && (
                <Link href="/orders" className="relative p-2 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200" title="My Orders">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </Link>
              )}

              {/* Cart Icon */}
              {status === "authenticated" && (
                <Link href="/cart" className="relative p-2 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200" title="Cart">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </Link>
              )}

              {/* Loading */}
              {status === "loading" && (
                <div className="w-8 h-8 rounded-full border-2 border-indigo-200 border-t-indigo-600 animate-spin"></div>
              )}

              {/* Not logged in */}
              {status === "unauthenticated" && (
                <Link href="/login">
                  <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    Login
                  </button>
                </Link>
              )}

              {/* Logged in */}
              {status === "authenticated" && (
                <div className="flex items-center space-x-3">
                  {/* Seller link */}
                  {session.user.role === "seller" && (
                    <Link href="/seller" className="px-4 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-all duration-200">
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Seller
                      </span>
                    </Link>
                  )}

                  {/* User Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-all duration-200"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {session.user.email?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-slate-700 hidden lg:block max-w-[120px] truncate">
                        {session.user.email}
                      </span>
                      <svg 
                        className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                        <div className="p-4 border-b border-slate-200">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                              {session.user.email?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">
                                {userDetails?.name || 'User'}
                              </p>
                              <p className="text-sm text-slate-500">
                                {session.user.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 space-y-3">
                          {/* User Details */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-600">Name:</span>
                              <span className="text-sm font-medium text-slate-900">
                                {userDetails?.name || 'Not provided'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-600">Phone:</span>
                              <span className="text-sm font-medium text-slate-900">
                                {userDetails?.phone || 'Not provided'}
                              </span>
                            </div>
                            <div className="flex justify-between items-start">
                              <span className="text-sm text-slate-600">Address:</span>
                              <span className="text-sm font-medium text-slate-900 text-right max-w-[200px]">
                                {userDetails?.address || 'Not provided'}
                              </span>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="pt-3 border-t border-slate-200 space-y-2">
                            <button
                              onClick={handleAccountClick}
                              className="w-full px-4 py-2 text-left text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              Manage Account
                            </button>
                            <Link href="/orders" className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-all duration-200 flex items-center gap-2" onClick={() => setIsUserDropdownOpen(false)}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                              My Orders
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Logout */}
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200 animate-slide-up">
              <div className="flex flex-col space-y-2">
                <Link href="/" className="px-4 py-3 text-slate-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200">
                  Home
                </Link>
                <Link href="/product" className="px-4 py-3 text-slate-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200">
                  Products
                </Link>
                <Link href="/about" className="px-4 py-3 text-slate-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200">
                  About
                </Link>
                {status === "authenticated" && (
                  <Link href="/orders" className="px-4 py-3 text-slate-700 hover:text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    My Orders
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  };

  export default Navbar;
