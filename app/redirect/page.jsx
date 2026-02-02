"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.role === "seller") {
        router.push("/seller");
      } else {
        router.push("/"); 
      }
    }
  }, [status, session, router]);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 relative">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 animate-spin"></div>
          <div className="absolute inset-2 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome back!</h2>
        <p className="text-slate-500">Redirecting you to the right place...</p>
      </div>
    </div>
  );
}
