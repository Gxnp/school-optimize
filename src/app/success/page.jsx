"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const tuitionData = [
  { subject: "วิทยาศาสตร์ - คณิตศาสตร์ (AI-Robotic-Coding)" },
  {
    subject:
      "วิทยาศาสตร์ - คณิตศาสตร์ (เพชรกัลปพฤกษ์)",
  },
  { subject: "วิทยาศาสตร์ - คณิตศาสตร์" },
  { subject: "คณิตศาสตร์ - อังกฤษ (ธุรกิจการบิน)" },
  { subject: "คณิตศาสตร์ - อังกฤษ" },
  { subject: "ภาษาอังกฤษ - ภาษาจีน" },
  { subject: "ภาษาอังกฤษ - ภาษาญี่ปุ่น" },
  { subject: "ภาษาอังกฤษ - ภาษาเกาหลี" },
  { subject: "พลศึกษา" },
  { subject: "ทวีศึกษา" },
];

export default function SuccessPage() {
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    nationalId: "",
    dob: "",
    age: "",
    religion: "",
    ethnicity: "",
    nationality: "",
    phone: "",
    address: "",
    previousSchool: "",
    gpa: "",
    gradeApplyingFor: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const fields = [
    {
      label: "คำนำหน้า",
      name: "title",
      type: "select",
      options: ["เด็กชาย", "เด็กหญิง", "นาย", "นางสาว"],
    },
    { label: "ชื่อ-นามสกุล", name: "name", type: "text" },
    { label: "เลขบัตรประชาชน", name: "nationalId", type: "text" },
    { label: "วันเกิด", name: "dob", type: "date" },
    { label: "อายุ", name: "age", type: "number" },
    { label: "ศาสนา", name: "religion", type: "text" },
    { label: "เชื้อชาติ", name: "ethnicity", type: "text" },
    { label: "สัญชาติ", name: "nationality", type: "text" },
    { label: "เบอร์โทรศัพท์", name: "phone", type: "text" },
    { label: "ที่อยู่", name: "address", type: "textarea" },
    { label: "โรงเรียนที่จบการศึกษา", name: "previousSchool", type: "text" },
    { label: "เกรดเฉลี่ย", name: "gpa", type: "number" },
    {
      label: "แผนการเรียนที่ต้องการศึกษาต่อ",
      name: "gradeApplyingFor",
      type: "select",
      options: tuitionData.map((item) => item.subject),
    },
  ];

  useEffect(() => {
    const storedPhone = localStorage.getItem("userPhoneNumber");
    if (storedPhone) {
      setPhone(storedPhone);
    }
  }, []);

  useEffect(() => {
    if (phone) {
      const fetchUserData = async () => {
        try {
          const response = await fetch("/api/getUserData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone }),
          });

          const data = await response.json();
          if (response.ok) {
            setFormData(data.user);
          } else {
            setStatusMessage(data.message || "ไม่พบข้อมูล");
          }
        } catch (error) {
          console.error("API Error:", error);
          setStatusMessage("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
        }
      };

      fetchUserData();
    }
  }, [phone]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "dob") {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData((prev) => ({ ...prev, dob: value, age: age.toString() }));
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/updateUserData", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatusMessage("บันทึกข้อมูลเรียบร้อยแล้ว");
        toast.success("บันทึกข้อมูลสำเร็จ!");
        setTimeout(() => {
          router.push("/"); // Redirect back to the home page
        }, 1500);
      } else {
        setStatusMessage(data.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
        toast.error(data.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (error) {
      console.error("API Error:", error);
      setStatusMessage("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
      toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col justify-center py-10 text-gray-900">
      <div className="w-lg mx-auto p-8 bg-white rounded-3xl shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          แก้ไขข้อมูลการสมัคร
        </h2>

        {fields.map((field) => (
          <div key={field.name} className="space-y-4">
            <label className="font-bold block  text-gray-800">{field.label}</label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- กรุณาเลือก --</option>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            ) : (
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            )}
          </div>
        ))}

        <button
          onClick={handleSave}
          className={`w-full p-3 bg-blue-500 text-white font-semibold rounded-lg ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
        </button>

        {statusMessage && (
          <p className="text-center text-red-500 mt-4">{statusMessage}</p>
        )}

        <Toaster position="top-center" />
      </div>
    </div>
  );
}
