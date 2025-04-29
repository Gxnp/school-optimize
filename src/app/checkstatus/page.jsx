"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // <-- อยู่ใน app router ของ Next.js 13+

export default function CheckApplicationStatus() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const cleanedPhoneNumber = phoneNumber.trim();
      if (!cleanedPhoneNumber) {
        setStatusMessage("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");
        setIsLoading(false);
        return;
      }

      const res = await fetch("/api/checkphone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: cleanedPhoneNumber }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatusMessage(data.message || "เกิดข้อผิดพลาดในการตรวจสอบสถานะ");
      } else {
        setStatusMessage("");
        console.log("เจอเบอร์แล้ว ส่งไปหน้า OTP");
        localStorage.setItem("userPhoneNumber", cleanedPhoneNumber);
        router.push("/otp");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเชื่อม API :", error);
      setStatusMessage("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
    } finally {
      console.log("ส่งข้อมูลเสร็จแล้ว เบอร์โทรที่กรอก:", phoneNumber);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          📄 ตรวจสอบสถานะการสมัคร
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="phone">
            เบอร์โทรศัพท์
          </label>
          <input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="กรอกเบอร์โทรศัพท์ของคุณ"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition active:scale-95"
        >
          {isLoading ? "กำลังตรวจสอบ..." : "ตรวจสอบสถานะ"}
        </button>
        {statusMessage && (
          <div className="mt-6 text-center text-red-500 font-semibold">
            {statusMessage}
          </div>
        )}
      </form>

      {/* Animation class */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
