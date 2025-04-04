"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation"; // Assuming you have a modal component
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function HealthAppsPage() {
  const [time, setTime] = useState(new Date());
  const router = useRouter();
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Detect platform on client side
    const userAgent = navigator.userAgent || navigator.vendor || "";
    setIsAndroid(/android/i.test(userAgent));
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !("MSStream" in window));
  }, []);

  const openHealthTreeApp = () => {
    if (isAndroid) {
      // Android intent format
      window.location.href =
        "intent://com.jks.Spo2MonitorEx.app.GuidePage#Intent;" +
        "scheme=healthtree;" +
        "package=com.jks.Spo2MonitorEx;" +
        "S.browser_fallback_url=https://play.google.com/store/apps/details?id=com.jks.Spo2MonitorEx;" +
        "end";
    } else if (isIOS) {
      // iOS URL scheme with App Store fallback
      window.location.href = "healthtree://";

      setTimeout(() => {
        window.location.href =
          "https://apps.apple.com/app/healthtree/id1526557099";
      }, 500);
    } else {
      window.location.href = "healthtree://";
    }
  };

  const openBeurerApp = () => {
    if (isAndroid) {
      // Android intent format
      window.location.href =
        "intent://com.beurer.healthmanager.ui.activity.FragmentActivity#Intent;" +
        "scheme=beurer;" +
        "package=com.beurer.healthmanager;" +
        "S.browser_fallback_url=https://play.google.com/store/apps/details?id=com.beurer.healthmanager;" +
        "end";
    } else if (isIOS) {
      // iOS URL scheme with App Store fallback
      window.location.href = "beurer://";

      setTimeout(() => {
        window.location.href =
          "https://apps.apple.com/app/beurer-healthmanager/id1057741667";
      }, 500);
    } else {
      window.location.href = "beurer://";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 relative">
      {/* Time Display */}
      <div className="absolute top-4 right-6 text-gray-700 text-lg font-semibold">
        {time.toLocaleTimeString()}
      </div>

      {/* Bumalik Button */}
      <Button
        variant="outline"
        className="absolute top-4 left-6"
        onClick={() => router.push("/user")}
      >
        Bumalik
      </Button>

      {/* Instruction Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="absolute top-6 right-6" variant="outline">
            Open Instructions
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Instruction Manual</DialogTitle>
            <DialogDescription>
              Welcome to the Health Monitoring Apps page! Before you proceed,
              please take a moment to review the following instructions for
              using the apps.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <h3 className="font-semibold">1. Blood Pressure - Omron Connect</h3>
            <p>
              This app allows you to monitor your blood pressure using the Omron
              Connect device. Follow the instructions in the app for accurate
              readings.
            </p>
            <h3 className="font-semibold">2. Oxygen Saturation - HealthTree</h3>
            <p>
              The HealthTree app helps you track your oxygen saturation levels.
              Ensure the app is installed and connected to your device for
              monitoring.
            </p>
            <h3 className="font-semibold">
              3. Temperature - Beurer Health Manager
            </h3>
            <p>
              The Beurer app allows you to track your body temperature. Pair
              your Beurer device with the app to get the most accurate
              temperature readings.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => alert("Proceeding with instructions")}>
              I understand, proceed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <h1 className="text-4xl font-extrabold text-center mb-8">
        Health Monitoring Apps
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* BP Card */}
        <Card className="w-full p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Blood Pressure
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-lg">
            <p className="text-gray-600 mb-6 text-center">
              Monitor your BP using the Omron Connect app.
            </p>
            <Button className="w-full py-3 text-lg">
              BP - Omron Connect app
            </Button>
          </CardContent>
        </Card>

        {/* Oxygen Saturation Card */}
        <Card className="w-full p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Oxygen Saturation
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-lg">
            <p className="text-gray-600 mb-6 text-center">
              Check your oxygen levels with the HealthTree app.
            </p>
            <Button className="w-full py-3 text-lg" onClick={openHealthTreeApp}>
              OxySat - HealthTree app
            </Button>
          </CardContent>
        </Card>

        {/* Temperature Card */}
        <Card className="w-full p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Body Temperature
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-lg">
            <p className="text-gray-600 mb-6 text-center">
              Track your temperature using the Beurer Health Manager Pro App.
            </p>
            <Button className="w-full py-3 text-lg" onClick={openBeurerApp}>
              Temperature - Beurer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
