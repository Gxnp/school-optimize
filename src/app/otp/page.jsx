"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const inputRefs = useRef([]); // สำหรับ focus ข้ามช่อง
  const router = useRouter();

  useEffect(() => {
    const phoneNumber = localStorage.getItem("userPhoneNumber");
    if (!phoneNumber){
      router.push("/");
    }
  },[]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // รับแค่ตัวเลข หรือค่าว่าง
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus(); // ถ้ามีค่ากระโดดไปช่องถัดไป
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // ถ้าลบแล้วช่องว่าง กระโดดกลับ
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const otpCode = otp.join("");

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otpCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatusMessage(data.message || "เกิดข้อผิดพลาดในการยืนยัน OTP");
      } else {
        setStatusMessage("");
        console.log("OTP ผ่านแล้ว ไปหน้าหลัก");

        window.location.href = "/success"; // หรือไปหน้าที่ต้องการ
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเชื่อม API:", error);
      setStatusMessage("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-center mb-3 text-gray-700">
          🔒 ยืนยันรหัส OTP
        </h2>
        <p className="text-lg font-medium text-center mb-3 text-gray-700">Mock Up OTP = 1 1 1 1 1 1</p>

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition active:scale-95"
        >
          {isLoading ? "กำลังยืนยัน..." : "ยืนยัน OTP"}
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
