"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="w-full max-w-3xl flex flex-col md:flex-row shadow-lg rounded-xl overflow-hidden bg-white">
        {/* Left Side - Welcome Section (Hidden on Small Screens) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hidden md:flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-500 w-1/2 h-full text-white p-10 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center">Welcome Back!</h2>
          <p className="mt-2 text-lg text-center">
            Join us and explore endless possibilities.
          </p>
        </motion.div>

        {/* Right Side - Authentication Form */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-8">
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
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 scale-125"
                      id="rememberMe"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-lg text-gray-700"
                    >
                      Remember Me
                    </label>
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
            <button className="flex items-center justify-center w-full border py-3 rounded-lg hover:bg-gray-100 transition text-lg">
              <FcGoogle className="mr-3 text-2xl" /> Continue with Google
            </button>
            <button className="flex items-center justify-center w-full border py-3 rounded-lg hover:bg-gray-100 transition text-lg">
              <FaGithub className="mr-3 text-2xl" /> Continue with GitHub
            </button>
          </motion.div>

          {/* Footer */}
          <p className="mt-4 text-center text-lg text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
