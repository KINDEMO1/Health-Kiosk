"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="w-full h-[600px] max-w-5xl flex shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side - Welcome Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hidden md:flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-500 w-1/2 h-full text-white p-12 shadow-lg hover:shadow-2xl transition-shadow"
        >
          <h2 className="text-4xl font-bold">Welcome Back!</h2>
          <p className="mt-2 text-lg text-center">
            Join us and explore endless possibilities.
          </p>
        </motion.div>

        {/* Right Side - Authentication Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        ></motion.div>

        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-12 bg-white relative">
          {/* Separator */}
          <div className="flex items-center justify-center my-4">
            <div className="border-t border-gray-300 w-1/4"></div>
            <p className="px-4 text-gray-500 text-sm font-medium">OR</p>
            <div className="border-t border-gray-300 w-1/4"></div>
          </div>

          {/* Tab Toggle */}
          <div className="flex justify-center space-x-6 mb-6">
            <button
              className={`text-lg font-semibold transition pb-2 ${
                !isSignUp
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-400"
              }`}
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
            <button
              className={`text-lg font-semibold transition pb-2 ${
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
          <div className="relative w-full min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isSignUp ? (
                <motion.form
                  key="signup"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute w-full space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 transition"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 transition"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 transition"
                      placeholder="Enter your password"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
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
                  className="absolute w-full space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 transition"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 transition"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      id="rememberMeSignUp"
                    />
                    <label
                      htmlFor="rememberMeSignUp"
                      className="text-sm text-gray-700"
                    >
                      Remember Me
                    </label>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
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
            className="mt-6 space-y-2"
          >
            <button className="flex items-center justify-center w-full border py-2 rounded-lg hover:bg-gray-100 transition">
              <FcGoogle className="mr-2 text-lg" /> Continue with Google
            </button>
            <button className="flex items-center justify-center w-full border py-2 rounded-lg hover:bg-gray-100 transition">
              <FaGithub className="mr-2 text-lg" /> Continue with GitHub
            </button>
          </motion.div>

          {/* Footer */}
          <p className="mt-4 text-center text-sm text-gray-600">
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
