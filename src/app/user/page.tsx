"use client";

import { useState, useEffect, JSX } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  FaUserMd,
  FaVideo,
  FaThermometer,
  FaWeight,
  FaHeartbeat,
  FaTachometerAlt,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Define Types
interface ChartData {
  day: string;
  value: number;
}

interface MetricCardProps {
  title: string;
  icon: JSX.Element;
  value: string;
  subValue?: string;
  chartData: ChartData[];
}

// Patient Data
const patientData = {
  name: "John Doe",
  age: 35,
  profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
  bloodPressure: {
    systolic: 120,
    diastolic: 80,
    history: [
      { day: "Day 1", value: 115 },
      { day: "Day 2", value: 118 },
      { day: "Day 3", value: 120 },
      { day: "Day 4", value: 117 },
      { day: "Day 5", value: 120 },
    ],
  },
  temperature: {
    current: 98.6,
    history: [
      { day: "Day 1", value: 98.4 },
      { day: "Day 2", value: 98.6 },
      { day: "Day 3", value: 98.7 },
      { day: "Day 4", value: 98.5 },
      { day: "Day 5", value: 98.6 },
    ],
  },
  weight: {
    current: 70,
    history: [
      { day: "Day 1", value: 69 },
      { day: "Day 2", value: 69.5 },
      { day: "Day 3", value: 70 },
      { day: "Day 4", value: 70.2 },
      { day: "Day 5", value: 70 },
    ],
    bmi: 22.5,
  },
  heartRate: {
    current: 72,
    history: [
      { day: "Day 1", value: 70 },
      { day: "Day 2", value: 72 },
      { day: "Day 3", value: 71 },
      { day: "Day 4", value: 73 },
      { day: "Day 5", value: 72 },
    ],
  },
};

export default function HealthDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
        <Skeleton className="h-12 w-48 mb-4" />
        <Skeleton className="h-6 w-64 mb-6" />
        <Skeleton className="h-72 w-full max-w-lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <header className="bg-white rounded-xl p-6 mb-8 shadow-lg flex items-center gap-6">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src={patientData.profileImage}
            alt="Patient"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d";
            }}
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {patientData.name}
          </h1>
          <p className="text-gray-600">Age: {patientData.age} years</p>
        </div>
      </header>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
        <MetricCard
          title="Blood Pressure"
          icon={<FaTachometerAlt className="text-blue-600 text-xl" />}
          value={`${patientData.bloodPressure.systolic}/${patientData.bloodPressure.diastolic}`}
          subValue="mmHg"
          chartData={patientData.bloodPressure.history}
        />
        <MetricCard
          title="Temperature"
          icon={<FaThermometer className="text-red-600 text-xl" />}
          value={`${patientData.temperature.current}°F`}
          chartData={patientData.temperature.history}
        />
        <MetricCard
          title="Weight"
          icon={<FaWeight className="text-green-600 text-xl" />}
          value={`${patientData.weight.current} kg`}
          subValue={`BMI: ${patientData.weight.bmi}`}
          chartData={patientData.weight.history}
        />
        <MetricCard
          title="Heart Rate"
          icon={<FaHeartbeat className="text-red-600 text-xl" />}
          value={`${patientData.heartRate.current} BPM`}
          chartData={patientData.heartRate.history}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Prescription Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex-1 flex items-center gap-3">
              <FaUserMd className="text-xl" />
              Request Prescription
            </Button>
          </DialogTrigger>
          <DialogContent>
            <h2 className="text-2xl font-bold mb-4">Request Prescription</h2>
            <textarea
              className="w-full p-3 border rounded-lg mb-4"
              placeholder="Describe your symptoms..."
              rows={4}
            />
            <div className="flex justify-end gap-4">
              <Button variant="secondary">Cancel</Button>
              <Button>Submit Request</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Video Consultation Button */}
        <Button className="flex-1 flex items-center gap-3 bg-green-600 hover:bg-green-700">
          <FaVideo className="text-xl" />
          Start Video Consultation
        </Button>
      </div>
    </div>
  );
}

// MetricCard Component with Recharts
function MetricCard({
  title,
  icon,
  value,
  subValue,
  chartData,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="p-3 bg-blue-100 rounded-full">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-blue-600">{value}</div>
        {subValue && <p className="text-gray-600 mb-4">{subValue}</p>}
        <div className="mt-4 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
