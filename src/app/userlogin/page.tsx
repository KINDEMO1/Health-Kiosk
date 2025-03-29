"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider, signInWithPopup } from "@/lib/firebase"; // Ensure the correct import path
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User signed in:", result.user);
      router.push("/dashboard"); // Redirect to dashboard after login
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="w-full max-w-3xl flex flex-col shadow-lg rounded-xl overflow-hidden bg-white p-8">
        {/* Tab Toggle */}
        <div className="flex justify-center space-x-6 mb-6">
          <button
            className={`text-lg font-semibold pb-2 transition ${
              !isSignUp
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-400"
            }`}
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
          <button
            className={`text-lg font-semibold pb-2 transition ${
              isSignUp
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-400"
            }`}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>

        {/* Form Container */}
        <div className="relative w-full min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isSignUp ? (
              <motion.form
                key="signup"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute w-full space-y-5"
              >
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
                    placeholder="Enter your password"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 text-lg transition"
                >
                  Sign Up
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="signin"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute w-full space-y-5"
              >
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
                    placeholder="Enter your password"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 text-lg transition"
                >
                  Sign In
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Social Logins */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="mt-6 space-y-3"
        >
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full border py-3 rounded-lg hover:bg-gray-100 transition text-lg"
          >
            <FcGoogle className="mr-3 text-2xl" /> Continue with Google
          </button>
        </motion.div>
      </div>
    </div>
  );
}
