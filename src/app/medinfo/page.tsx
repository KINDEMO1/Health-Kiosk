"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaChevronLeft, FaSave, FaChevronRight } from "react-icons/fa";
import { useLanguage } from "@/context/LanguangeContext"

interface MedicalFormData {
  symptoms: string;
  systolic: string;
  diastolic: string;
  oxygenSaturation: string;
  temperature: string;
  pulserate: string;
  height: string;
  weight: string;
}

export default function MedicalInformation() {
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage()
  const [formData, setFormData] = useState<MedicalFormData>({
    symptoms: "",
    systolic: "",
    diastolic: "",
    oxygenSaturation: "",
    temperature: "",
    pulserate: "",
    height: "",
    weight: "",
  });

  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    setMounted(true);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Medical data saved:", formData);
    localStorage.setItem("medicalFormData", JSON.stringify(formData));
    alert("Medical information saved successfully!");
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "tl" : "en")
  }

  if (!mounted) return null

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


      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 text-center">
      {t("medinfo.title")}
      </h1>

      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6 space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {t("medinfo.title")}
          </h2>
          <Label className="block mb-2">
            Ano ang iyong karamdamang nais mong ipakonsulta?
          </Label>
          <Textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            placeholder="Ilagay ang iyong sagot dito..."
            className="w-full resize-none overflow-auto h-32"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>\{t("medinfo.bp")}</Label>
            <div className="flex gap-2 mt-1">
              <Input
                name="systolic"
                type="number"
                value={formData.systolic}
                onChange={handleChange}
                placeholder="Systolic"
              />
              <Input
                name="diastolic"
                type="number"
                value={formData.diastolic}
                onChange={handleChange}
                placeholder="Diastolic"
              />
            </div>
          </div>

          <div>
            <Label>{t("medinfo.oxygen")}</Label>
            <Input
              type="number"
              name="oxygenSaturation"
              value={formData.oxygenSaturation}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label>{t("medinfo.temp")}</Label>
            <Input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label>{t("medinfo.pulse")}</Label>
            <Input
              type="number"
              name="pulserate"
              value={formData.pulserate}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label>{t("medinfo.height")}</Label>
            <Input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label>{t("medinfo.weight")}</Label>
            <Input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between w-full max-w-5xl mt-6 gap-2 mx-auto">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2"
        >
          <FaChevronLeft /> {t("back.button")}
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSave}
            className="flex items-center gap-2"
          >
            <FaSave /> {t("save.button")}
          </Button>
          <Button
            onClick={() => router.push("/deeplink")}
            className="flex items-center gap-2"
          >
            {t("next.button")} <FaChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
