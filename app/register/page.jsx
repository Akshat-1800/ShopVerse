'use client'
import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams,useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';

const RegisterForm = () => {
  const router=useRouter();
  const searchParams = useSearchParams();
  const roleFromUrl = searchParams.get("role"); // "buyer" | "seller"
  const role =
  roleFromUrl === "seller" ? "seller" : "customer";
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        role, 
      }),
    });
    
    console.log(res);
    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    // Auto-login after register
// const loginRes = await signIn("credentials", {
//   redirect: false,
//   email: formData.email,
//   password: formData.password,
// });

// if (loginRes?.error) {
//   alert("Registered but login failed");
//   router.push("/login");
//   return;
// }

// if (role === "seller") {
//   router.push("/seller");
// } else {
//   router.push("/");
// }
router.push("/login");


  } catch (error) {
    console.error("Register error:", error);
    alert("Something went wrong");
  }
};



  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-purple-600 px-8 py-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Create {role === "seller" ? "Seller" : "Buyer"} Account</h2>
            <p className="text-blue-100">Join our marketplace today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8">
            {/* Email Field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-slate-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-slate-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-8">
              <label htmlFor="confirmPassword" className="block text-slate-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="px-8 pb-8 text-center border-t border-slate-200">
            <p className="text-slate-600 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const RegisterPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-linear-to-r from-blue-600 to-purple-600 px-8 py-10 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Loading...</h2>
              <p className="text-blue-100">Please wait</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  )
}

export default RegisterPage
