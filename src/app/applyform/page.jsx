"use client";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { stepOneSchema, stepTwoSchema } from "@/lib/validationSchema";
import toast, { Toaster } from "react-hot-toast";
import StepOne from "@/components/stepone";
import StepTwo from "@/components/steptwo";
import { useState, useEffect } from "react";

export default function ApplyForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = step === 1 ? stepOneSchema : stepTwoSchema;

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    methods.reset(methods.getValues()); // รีเซตเมื่อ schema เปลี่ยน เพื่อไม่ให้ error หายไปเฉย ๆ
  }, [step]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 2000));
      toast.success("ส่งใบสมัครสำเร็จ!");
      console.log("ข้อมูลที่ส่ง:", data);
    } catch (err) {
      toast.error("เกิดข้อผิดพลาด");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    const currentSchema = step === 1 ? stepOneSchema : stepTwoSchema;
    try {
      const values = methods.getValues();
      await currentSchema.validate(values, { abortEarly: false });
      setStep((prev) => prev + 1);
    } catch (err) {
      if (err.inner) {
        err.inner.forEach((e) => {
          methods.setError(e.path, {
            type: "manual",
            message: e.message,
          });
        });
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-xl mx-auto p-4 space-y-6"
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
  );
}
