"use client";

import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { stepOneSchema, stepTwoSchema } from "@/lib/validationSchema";
import toast, { Toaster } from "react-hot-toast";
import StepOne from "@/components/stepone";
import StepTwo from "@/components/steptwo";
import { useState } from "react";

export default function ApplyForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // ใช้ router

  const schema = step === 1 ? stepOneSchema : stepTwoSchema;

  // 💡 สร้าง useForm ใหม่ทุกครั้งเมื่อ step เปลี่ยน โดยใช้ key
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const orderedData = {
      title: data.title,
      name: data.fullName, // ✅ เปลี่ยนชื่อ key ให้ตรงกับ schema
      nationalId: data.nationalId,
      dob: data.dateOfBirth,
      age: data.age.toString(), // ✅ Prisma กำหนดเป็น String
      religion: data.religion,
      ethnicity: data.ethnicity,
      nationality: data.nationality,
      phone: data.phone,
      address: data.address,
      previousSchool: data.graduatedSchool,
      gpa: data.gpa.toString(), // ✅ Prisma กำหนดเป็น String
      gradeApplyingFor: data.desiredProgram,
      profilePicture: "", // ใส่ default ว่างไว้ก่อนได้ ถ้ายังไม่ได้อัปโหลด
    };

    try {
      console.log("ข้อมูลจาก form ทั้งหมด:", methods.getValues());
      console.log("ข้อมูลที่จัดเรียงแล้ว:", orderedData);

      await new Promise((res) => setTimeout(res, 2000)); // ดีเลย์ที่นี่ถ้าอยากให้เห็นก่อนส่งจริง
      console.log("ข้อมูลที่ส่ง:", orderedData);

      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderedData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("ส่งใบสมัครสำเร็จ!");
        // เพิ่มดีเลย์ 1 วินาที แล้ว redirect ไปหน้า /
        setTimeout(() => {
          router.push("/"); // ใช้ router.push เพื่อไปหน้า /
        }, 1000);
        console.log("ข้อมูลที่ส่ง:", orderedData);
      } else {
        // ถ้าการสมัครล้มเหลวหรือข้อมูลซ้ำ
        toast.error(result.error || "เกิดข้อผิดพลาด else");
      }
    } catch (err) {
      console.error(err);
      toast.error("เกิดข้อผิดพลาด catch");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    const isValid = await methods.trigger(); // ✅ ตรวจสอบฟอร์มทั้งหมดก่อนเปลี่ยน step
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white ">
      <FormProvider {...methods}>
        <form
          key={step} // ✅ รีโหลดฟอร์มเมื่อเปลี่ยน step เพื่อให้ resolver ทำงานใหม่
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-xl mx-auto p-4 space-y-6 "
        >
          {step === 1 && <StepOne />}
          {step === 2 && <StepTwo />}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-300 text-black px-6 py-2 rounded disabled:opacity-60"
              disabled={step === 1}
            >
              ย้อนกลับ
            </button>

            {step === 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className={`bg-blue-500 text-white px-6 py-2 rounded ${
                  isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                ถัดไป
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? "กำลังส่ง..." : "ส่งใบสมัคร"}
              </button>
            )}
          </div>

          <Toaster position="top-center" />
        </form>
      </FormProvider>
    </div>
  );
}
