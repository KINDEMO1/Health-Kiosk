"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { auth, googleProvider, signInWithPopup } from "@/lib/firebase"; // Correct import

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPhoneLogin, setIsPhoneLogin] = useState(false); // Track if phone login is selected
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider); // Using signInWithPopup from firebase.js
      const user = result.user;
      console.log("User info: ", user);
      router.push("/dashboard"); // Navigate to the dashboard or another page after login
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="w-full max-w-3xl flex flex-col shadow-lg rounded-xl overflow-hidden bg-white p-8">
        {/* Tab Toggle */}
        <div className="flex justify-center space-x-6 mb-6">
          {/* Sign In Button */}
          <button
            className={`text-lg font-semibold pb-2 transition ${
              !isSignUp && !isPhoneLogin
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-400"
            }`}
            onClick={() => {
              setIsSignUp(false);
              setIsPhoneLogin(false); // Deactivate Phone login when Sign In is clicked
            }}
          >
            Sign In
          </button>

          {/* Sign Up Button */}
          <button
            className={`text-lg font-semibold pb-2 transition ${
              isSignUp && !isPhoneLogin
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-400"
            }`}
            onClick={() => {
              setIsSignUp(true);
              setIsPhoneLogin(false); // Deactivate Phone login when Sign Up is clicked
            }}
          >
            Sign Up
          </button>

          {/* Phone Button */}
          <button
            className={`text-lg font-semibold pb-2 transition ${
              isPhoneLogin
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-400"
            }`}
            onClick={() => setIsPhoneLogin(!isPhoneLogin)} // Toggle Phone Login
          >
            Phone
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
            ) : !isPhoneLogin ? ( // Render Email SignIn when phone login is not selected
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
            ) : (
              // Render Phone SignIn when phone login is selected
              <div className="absolute w-full space-y-5">
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
                    placeholder="Enter your phone number"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 text-lg transition mt-4"
                  >
                    Send OTP
                  </motion.button>
                </div>

                {/* Hide OTP section */}
                {/* <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
                    placeholder="Enter OTP"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 text-lg transition mt-4"
                  >
                    Verify OTP
                  </motion.button>
                </div> */}
              </div>
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
