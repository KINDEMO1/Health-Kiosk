"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaChevronLeft, FaSave } from "react-icons/fa";

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
  const [formData, setFormData] = useState<PersonalFormData>({
    fullName: "",
    age: "",
    sex: "",
    birthday: "",
    address: "",
    contactNumber: "",
  });

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4 flex flex-col items-center justify-center relative">
      <div className="absolute top-4 right-6 text-gray-700 text-lg font-semibold">
        {time.toLocaleTimeString()}
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 text-center">
        Patient Information System
      </h1>

      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6 space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Personal na Impormasyon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Pangalan</Label>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Edad</Label>
              <Input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Kasarian</Label>
              <Input name="sex" value={formData.sex} onChange={handleChange} />
            </div>
            <div>
              <Label>Petsa ng Kapanganakan</Label>
              <Input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Address</Label>
              <Textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Numero ng Telepono</Label>
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
          <FaChevronLeft /> Bumalik
        </Button>
        <div className="flex gap-2 justify-end w-full md:w-auto">
          <Button
            variant="outline"
            onClick={handleSave}
            className="flex items-center gap-2"
          >
            <FaSave /> Save
          </Button>
        </div>
      </div>
    </div>
  );
}
