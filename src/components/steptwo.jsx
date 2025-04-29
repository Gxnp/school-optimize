'use client';

import { useFormContext } from 'react-hook-form';

const tuitionData = [
  { subject: "วิทยาศาสตร์ - คณิตศาสตร์ (AI-Robotic-Coding)" },
  { subject: "วิทยาศาสตร์ - คณิตศาสตร์ (เพชรกัลปพฤกษ์)" },
  { subject: "วิทยาศาสตร์ - คณิตศาสตร์" },
  { subject: "คณิตศาสตร์ - อังกฤษ (ธุรกิจการบิน)" },
  { subject: "คณิตศาสตร์ - อังกฤษ" },
  { subject: "ภาษาอังกฤษ - ภาษาจีน" },
  { subject: "ภาษาอังกฤษ - ภาษาญี่ปุ่น" },
  { subject: "ภาษาอังกฤษ - ภาษาเกาหลี" },
  { subject: "พลศึกษา" },
  { subject: "ทวีศึกษา" },
];

export default function StepTwo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4 text-black">
      <div>
        <label className="block font-medium text-gray-700">ที่อยู่</label>
        <textarea
          {...register('address')}
          className="w-full border rounded px-3 py-2 mt-1"
          rows={3}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700">โรงเรียนที่จบการศึกษา</label>
        <input
          type="text"
          {...register('graduatedSchool')}
          className="w-full border rounded px-3 py-2 mt-1"
        />
        {errors.graduatedSchool && (
          <p className="text-red-500 text-sm mt-1">{errors.graduatedSchool.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700">เกรดเฉลี่ย</label>
        <input
          type="number"
          step="0.01"
          {...register('gpa')}
          className="w-full border rounded px-3 py-2 mt-1"
        />
        {errors.gpa && (
          <p className="text-red-500 text-sm mt-1">{errors.gpa.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium text-gray-700">แผนการเรียนที่ต้องการศึกษาต่อ</label>
        <select
          {...register('desiredProgram')}
          className="w-full border rounded px-3 py-2 mt-1"
        >
          <option value="">-- กรุณาเลือกแผนการเรียน --</option>
          {tuitionData.map((item, index) => (
            <option key={index} value={item.subject}>
              {item.subject}
            </option>
          ))}
        </select>
        {errors.desiredProgram && (
          <p className="text-red-500 text-sm mt-1">{errors.desiredProgram.message}</p>
        )}
      </div>
    </div>
  );
}
