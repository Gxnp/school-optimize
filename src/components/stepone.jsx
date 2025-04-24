'use client';

import { useFormContext } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { applicationSchema } from '@/lib/validationSchema'; // นำเข้า validation schema

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * ฟอร์มขั้นตอนที่ 1 สำหรับกรอกข้อมูลส่วนตัว
 * ประกอบด้วยช่องกรอกสำหรับ:
 *   - คำนำหน้า
 *   - ชื่อ-นามสกุล
 *   - เลขบัตรประชาชน
 *   - เบอร์โทรศัพท์
 *   - วันเกิด
 *   - อายุ
 *   - ศาสนา
 *   - เชื้อชาติ
 *   - สัญชาติ
 * ฟอร์มจะตรวจสอบความถูกต้องของข้อมูลด้วย yup
 * และจะส่งข้อมูลเมื่อฟอร์มกรอกครบและการตรวจสอบความถูกต้องผ่าน
/*******  26f56be3-dbb1-412c-aee9-e1955935ebdb  *******/export default function StepOne() {
  const { register, formState: { errors }, setValue, watch } = useFormContext();
  
  // เก็บอายุที่คำนวณได้
  const [age, setAge] = useState('');
  const dateOfBirth = watch('dateOfBirth'); // วันเกิดที่ผู้ใช้กรอก

  // คำนวณอายุอัตโนมัติเมื่อผู้ใช้กรอกวันเกิด
  useEffect(() => {
    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge); // อัปเดตอายุ
      setValue('age', calculatedAge); // ตั้งค่าอายุในฟอร์ม
    }
  }, [dateOfBirth, setValue]);

  return (
    <div className="space-y-4 text-black">
      <div>
        <label>คำนำหน้า</label>
        <select 
          {...register('title')} 
          className="w-full border p-2 rounded"
        >
          <option value="เด็กชาย">เด็กชาย</option>
          <option value="เด็กหญิง">เด็กหญิง</option>
          <option value="นาย">นาย</option>
          <option value="นางสาว">นางสาว</option>
        </select>
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label>ชื่อ-นามสกุล</label>
        <input
          {...register('fullName')}
          className="w-full border p-2 rounded"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label>เลขบัตรประชาชน</label>
        <input
          {...register('nationalId')}
          className="w-full border p-2 rounded"
        />
        {errors.nationalId && (
          <p className="text-red-500 text-sm">{errors.nationalId.message}</p>
        )}
      </div>

      <div>
        <label>เบอร์โทรศัพท์</label>
        <input
          {...register('phone')}
          className="w-full border p-2 rounded"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label>วันเกิด</label>
        <input
          type="date"
          {...register('dateOfBirth')}
          className="w-full border p-2 rounded"
        />
        {errors.dateOfBirth && (
          <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
        )}
      </div>

      <div>
        <label>อายุ</label>
        <input
          {...register('age')}
          value={age} // แสดงอายุที่คำนวณได้
          onChange={(e) => setAge(e.target.value)} // ให้แก้ไขอายุได้
          className="w-full border p-2 rounded"
        />
        {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
      </div>

      <div>
        <label>ศาสนา</label>
        <input
          {...register('religion')}
          className="w-full border p-2 rounded"
        />
        {errors.religion && <p className="text-red-500 text-sm">{errors.religion.message}</p>}
      </div>

      <div>
        <label>เชื้อชาติ</label>
        <input
          {...register('ethnicity')}
          className="w-full border p-2 rounded"
        />
        {errors.ethnicity && <p className="text-red-500 text-sm">{errors.ethnicity.message}</p>}
      </div>

      <div>
        <label>สัญชาติ</label>
        <input
          {...register('nationality')}
          className="w-full border p-2 rounded"
        />
        {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality.message}</p>}
      </div>
    </div>
  );
}
