"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import {
  FaUser,
  FaBriefcaseMedical,
  FaUsers,
  FaHospital,
  FaSignOutAlt,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase";

export default function DoctorsHomePage() {
  const router = useRouter();
  const [isEnglish, setIsEnglish] = useState(false);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const translations = {
    homepage: "Doctor's Home Page",
    personalInfo: isEnglish
      ? "Doctor's Personal Information"
      : "Personal na Impormasyon ng Doktor",
    startAppointments: isEnglish
      ? "Start Health Kiosk Appointments"
      : "Simulan ang Health Kiosk Appointment",
    patientInfo: isEnglish ? "Patient Information" : "Impormasyon ng Pasyente",
    ehrClinic: isEnglish ? "PPD Clinic (EHR)" : "PPD Clinic (EHR)",
    logout: isEnglish ? "Logout" : "Mag Log out",
  };

  const handleLogout = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth); // Log the user out of Firebase
      router.push("/form"); // Redirect to /form after logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center p-4">
      <div className="w-[700px] max-w-full px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/form")}
          >
            <IoArrowBack size={28} className="text-gray-700" />
          </Button>

          {currentTime && currentDate && (
            <div className="absolute top-4 right-6 flex flex-col items-center sm:items-end">
              <p className="text-lg font-semibold text-gray-900">
                {currentTime}
              </p>
              <p className="text-sm text-gray-500">{currentDate}</p>
            </div>
          )}

          <Button
            variant="outline"
            onClick={() => setIsEnglish(!isEnglish)}
            className="px-4 sm:px-6 py-2 text-blue-700 text-lg font-semibold"
          >
            {isEnglish ? "Filipino" : "English"}
          </Button>
        </div>

        <h1 className="text-3xl font-extrabold text-center text-gray-900 mt-2">
          {translations.homepage}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {[
            {
              icon: <FaUser className="text-2xl text-blue-600" />,
              text: translations.personalInfo,
              onClick: () => router.push("/docprofiles"),
            },
            {
              icon: <FaBriefcaseMedical className="text-2xl text-green-600" />,
              text: translations.startAppointments,
              onClick: () => router.push("/appointment"),
            },
            {
              icon: <FaUsers className="text-2xl text-indigo-600" />,
              text: translations.patientInfo,
              onClick: () => router.push("/patientinfo"),
            },
            {
              icon: <FaHospital className="text-2xl text-purple-600" />,
              text: translations.ehrClinic,
              onClick: () => window.open("https://www.ppd.ph/", "_blank"),
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="w-full flex flex-col items-center justify-center gap-4 p-5 sm:p-6 rounded-2xl shadow-md transition-all duration-200 hover:scale-105 cursor-pointer bg-white text-center"
              onClick={item.onClick}
            >
              {item.icon}
              <span className="text-lg sm:text-xl font-semibold">
                {item.text}
              </span>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full flex items-center justify-center gap-4 p-5 sm:p-6 text-lg sm:text-xl font-semibold rounded-2xl shadow-lg hover:scale-105 transition-all"
          >
            <FaSignOutAlt className="text-2xl" />
            {translations.logout}
          </Button>
        </div>

        <div className="mt-10 text-gray-500 text-lg font-medium text-center">
          eKonsulTech
        </div>
      </div>
    </div>
  );
}
