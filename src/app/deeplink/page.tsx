"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import BPInstructionManual from "@/components/instruction-manuals/bp-instruction"
import OxySatInstructionManual from "@/components/instruction-manuals/oxysat-instruction"
import TemperatureInstructionManual from "@/components/instruction-manuals/temperature-instruction"

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-6 relative">
      {/* Time Display */}
      <div className="absolute top-4 right-6 text-gray-700 text-lg font-semibold z-10">
        {time.toLocaleTimeString()}
      </div>

      {/* Bumalik Button */}
      <Button
        variant="outline"
        className="absolute top-15 left-65 z-10"
        onClick={() => router.push("/medinfo")}
      >
        Bumalik
      </Button>

      <h1 className="text-4xl font-extrabold text-center mb-8">
        Health Monitoring Apps
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* BP Card */}
        <Card className="w-full p-6 shadow-lg hover:bg-blue-50">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Blood Pressure
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-lg">
            <p className="text-gray-600 mb-6 text-center">
              Monitor your BP using the Omron Connect app.
            </p>
            <div className="flex flex-col w-full gap-3">
            <Button className="w-full py-3 text-lg bg-blue-600 text-white hover:bg-blue-700 mt-6">
              BP - Omron Connect app
            </Button>
            <BPInstructionManual/>
            </div>
          </CardContent>
        </Card>

        {/* Oxygen Saturation Card */}
        <Card className="w-full p-6 shadow-lg hover:bg-green-50">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Oxygen Saturation
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-lg">
            <p className="text-gray-600 mb-6 text-center">
              Check your oxygen levels with the HealthTree app.
            </p>
            <div className="flex flex-col w-full gap-3">
            <Button
              className="w-full py-3 text-lg bg-green-600 text-white hover:bg-green-700 mt-6"
              onClick={openHealthTreeApp}
            >
              OxySat - HealthTree app
            </Button>
            <OxySatInstructionManual />
            </div>
          </CardContent>
        </Card>

        {/* Temperature Card */}
        <Card className="w-full p-6 shadow-lg hover:bg-red-50">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Body Temperature
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-lg">
            <p className="text-gray-600 mb-6 text-center">
              Track your temperature using the Beurer Health Manager Pro App.
            </p>
            <div className="flex flex-col w-full gap-3">
            <Button
              className="w-full py-3 text-lg bg-red-600 text-white hover:bg-red-700"
              onClick={openBeurerApp}
            >
              Temperature - Beurer
            </Button>
            <TemperatureInstructionManual />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
