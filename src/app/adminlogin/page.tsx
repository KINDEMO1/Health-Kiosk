"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FcGoogle } from "react-icons/fc"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase" // Updated import

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  // Handle Google Sign-In with Supabase
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      setErrorMessage("")

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/admindash`,
        },
      })

      if (error) throw error

      // The redirect will happen automatically through Supabase
    } catch (error) {
      console.error("Error during Google sign-in:", error)
      setErrorMessage("Failed to sign in with Google. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle email sign in/sign up
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    try {
      if (isSignUp) {
        // Sign up with email
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: "admin", // Add role for admin users
            },
          },
        })

        if (error) throw error

        // Redirect to admin dashboard
        router.push("/admindash")
      } else {
        // Sign in with email
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        // Redirect to admin dashboard
        router.push("/admindash")
      }
    } catch (error: any) {
      console.error("Authentication error:", error)
      setErrorMessage(error.message || "Authentication failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <header className="w-full bg-blue-500 p-2 shadow-lg fixed top-0 left-0 z-10">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <Link href="/" className="text-white text-2xl font-semibold hover:underline">
            eKonsulTech
          </Link>
          <nav>
            <ul className="flex space-x-6 text-white text-lg">
              <li>
                <Button variant="link" className="text-white hover:text-blue-300" onClick={() => router.push("/about")}>
                  About
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-white hover:text-blue-300"
                  onClick={() => router.push("/contacts")}
                >
                  Contacts
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="w-full max-w-3xl flex flex-col shadow-lg rounded-xl overflow-hidden bg-white p-8">
        {/* Tab Toggle */}
        <div className="flex justify-center space-x-6 mb-6">
          <button
            className={`text-lg font-semibold pb-2 transition ${
              !isSignUp ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"
            }`}
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
          <button
            className={`text-lg font-semibold pb-2 transition ${
              isSignUp ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"
            }`}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{errorMessage}</div>
        )}

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
                onSubmit={handleEmailAuth}
              >
                <div>
                  <label className="block text-lg font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 text-lg transition"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing Up..." : "Sign Up"}
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
                onSubmit={handleEmailAuth}
              >
                <div>
                  <label className="block text-lg font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 text-lg transition"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
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
            disabled={isLoading}
            className="flex items-center justify-center w-full border py-3 rounded-lg hover:bg-gray-100 transition text-lg"
          >
            <FcGoogle className="mr-3 text-2xl" />
            {isLoading ? "Connecting..." : "Continue with Google"}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
