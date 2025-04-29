'use client';

import { useFormContext } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { applicationSchema } from '@/lib/validationSchema';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
    },
  }),
};

export default function StepOne() {
  const { register, formState: { errors }, setValue, watch } = useFormContext();
  const [age, setAge] = useState('');
  const dateOfBirth = watch('dateOfBirth');

  useEffect(() => {
    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }

      setAge(calculatedAge.toString());
      setValue('age', calculatedAge);
    }
  }, [dateOfBirth, setValue]);

  const fields = [
    { label: 'คำนำหน้า', name: 'title', type: 'select', options: ['เด็กชาย', 'เด็กหญิง', 'นาย', 'นางสาว'] },
    { label: 'ชื่อ-นามสกุล', name: 'fullName', type: 'text' },
    { label: 'เลขบัตรประชาชน', name: 'nationalId', type: 'text' },
    { label: 'เบอร์โทรศัพท์', name: 'phone', type: 'text' },
    { label: 'วันเกิด', name: 'dateOfBirth', type: 'date' },
    { label: 'อายุ', name: 'age', type: 'number', value: age },
    { label: 'ศาสนา', name: 'religion', type: 'text' },
    { label: 'เชื้อชาติ', name: 'ethnicity', type: 'text' },
    { label: 'สัญชาติ', name: 'nationality', type: 'text' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto space-y-6">
      {fields.map((field, i) => (
        <motion.div
          key={field.name}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="space-y-1"
        >
          <label className="font-semibold text-gray-700">{field.label}</label>
          {field.type === 'select' ? (
            <select
              {...register(field.name)}
              className="text-gray-900 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 "
            >
              {field.options?.map((option) => (
                <option key={option} value={option} className='text-gray-900'>{option}</option>
              ))}
            </select>
          ) : (
            <input
              {...register(field.name)}
              type={field.type}
              value={field.name === 'age' ? field.value : undefined}
              onChange={field.name === 'age' ? (e) => setAge(e.target.value) : undefined}
              className="text-gray-900 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
          {errors[field.name] && (
            <p className="text-red-500 text-sm">{(errors)[field.name]?.message}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
