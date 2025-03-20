"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HealthAppsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
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
              Bp - Omron Connect app
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
            <Button className="w-full py-3 text-lg">
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
            <Button className="w-full py-3 text-lg">
              Temperature - Beurer Health Manager Pro App
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
