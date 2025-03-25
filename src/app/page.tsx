"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { FaHeartbeat, FaClinicMedical, FaPills } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const products = [
  {
    id: 1,
    title: "Health Monitoring",
    description:
      "Advanced vital signs monitoring system for comprehensive health tracking.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
    icon: <FaHeartbeat className="text-7xl text-white" />,
  },
  {
    id: 2,
    title: "Virtual Consultation",
    description:
      "Connect with healthcare professionals instantly through secure video calls.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
    icon: <FaClinicMedical className="text-7xl text-white" />,
  },
  {
    id: 3,
    title: "Medicine Tracker",
    description: "Smart medication management system with timely reminders.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
    icon: <FaPills className="text-7xl text-white" />,
  },
];

export default function HealthcareKiosk() {
  const router = useRouter(); // ✅ Placed inside the component
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen flex ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 to-white text-gray-800"
      }`}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all"
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Left Side - Product Carousel */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8 relative">
        <Carousel className="w-full relative">
          <CarouselContent>
            {/* Arranged Carousel Content */}
            {products.map((product) => (
              <CarouselItem key={product.id} className="flex justify-center">
                <Card
                  className={`w-[700px] h-[650px] p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-blue-50"
                  }`}
                >
                  <div className="bg-blue-500 p-6 rounded-full">
                    {product.icon}
                  </div>
                  <h3 className="text-3xl font-semibold mt-6">
                    {product.title}
                  </h3>
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-52 h-52 object-cover my-6"
                  />
                  <p
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    } text-center`}
                  >
                    {product.description}
                  </p>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Adjusted Navigation Buttons */}
          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 scale-90" />
          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 scale-90" />
        </Carousel>
      </div>

      {/* Right Side - Welcome Section */}
      <div className="w-1/2 flex flex-col justify-center items-start p-12">
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
          Welcome to <span className="text-blue-500">Healthcare Kiosk</span>
        </h1>
        <p
          className={`text-lg ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          } mt-4`}
        >
          Experience the future of healthcare with our innovative digital
          solutions. Access medical services, track your health, and connect
          with professionals all in one place.
        </p>
        <Button
          onClick={() => router.push("/form")} // ✅ Fixed router issue
          className="mt-6 px-8 py-4 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg"
        >
          Get Started
        </Button>

        {/* Why Choose Us? */}
        <div
          className={`mt-8 p-6 rounded-xl w-full max-w-[700px] ${
            isDarkMode ? "bg-gray-800" : "bg-blue-50"
          }`}
        >
          <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-2">
              <span className="text-blue-500">✓</span>
              <span>24/7 Healthcare Support</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-500">✓</span>
              <span>Secure Patient Data</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-blue-500">✓</span>
              <span>Smart Health Monitoring</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
