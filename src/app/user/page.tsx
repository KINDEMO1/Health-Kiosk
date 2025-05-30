"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaChevronLeft, FaSave } from "react-icons/fa";
import { useLanguage } from "@/context/LanguangeContext"; // ✅ Fix: make sure this exists and is properly defined

interface PersonalFormData {
  fullName: string;
  age: string;
  sex: string;
  birthday: string;
  address: string;
  contactNumber: string;
}

export default function PersonalInformation() {
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();

  const [formData, setFormData] = useState<PersonalFormData>({
    fullName: "",
    age: "",
    sex: "",
    birthday: "",
    address: "",
    contactNumber: "",
  });

  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Personal data saved:", formData);
    localStorage.setItem("personalFormData", JSON.stringify(formData));
    alert("Personal information saved successfully!");
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "tl" : "en");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4 flex flex-col items-center justify-center relative">
      <div className="absolute top-4 right-6 text-gray-700 text-lg font-semibold">
        {time.toLocaleTimeString()}
      </div>

      <div className="absolute top-4 left-6">
        <Button variant="outline" onClick={toggleLanguage}>
          {t("language.toggle")}
        </Button>
      </div>

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 text-center mt-16">
        {t("user.title")}
      </h1>

      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6 space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {t("user.personal.info")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>{t("user.name")}</Label>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>{t("user.age")}</Label>
              <Input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>{t("user.sex")}</Label>
              <Input name="sex" value={formData.sex} onChange={handleChange} />
            </div>
            <div>
              <Label>{t("user.birthday")}</Label>
              <Input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <Label>{t("user.address")}</Label>
              <Textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <Label>{t("user.contact")}</Label>
              <Input
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl mt-6 gap-2 mx-auto">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2"
        >
          <FaChevronLeft /> {t("back.button")}
        </Button>
        <div className="flex gap-2 justify-end w-full md:w-auto">
          <Button
            variant="outline"
            onClick={handleSave}
            className="flex items-center gap-2"
          >
            <FaSave /> {t("save.button")}
          </Button>
        </div>
      </div>
    </div>
  );
}
