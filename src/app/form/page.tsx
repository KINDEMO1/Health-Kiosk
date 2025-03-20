"use client";

import { useState } from "react";
import { FaUserAlt, FaUserCog } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function HealthKiosk() {
  const [showError, setShowError] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 bg-gradient-to-br from-blue-50 to-teal-50 p-6">
      {/* Welcome Text */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Welcome to Web Health Kiosk
        </h1>
        <p className="text-xl text-gray-600 mt-2">
          Please select your role to continue
        </p>
      </div>

      {/* Role Selection Buttons - Centered */}
      <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
        {/* User Button */}
        <Button
          variant="outline"
          className="w-64 h-64 flex flex-col items-center justify-center rounded-lg bg-teal-50 hover:bg-teal-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          <FaUserAlt className="w-20 h-20 text-teal-600 mb-4" />
          <span className="text-2xl font-semibold text-teal-700">
            I am a User
          </span>
        </Button>

        {/* Admin Button with Dialog Trigger */}
        <Dialog open={showError} onOpenChange={setShowError}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-64 h-64 flex flex-col items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              onClick={() => setShowError(true)}
            >
              <FaUserCog className="w-20 h-20 text-gray-600 mb-4" />
              <span className="text-2xl font-semibold text-gray-700">
                I am an Admin
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Access Restricted</DialogTitle>
            </DialogHeader>
            <p className="text-gray-600">
              Admin access requires authentication. Please contact your system
              administrator.
            </p>
            <Button
              onClick={() => setShowError(false)}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
