// app/lib/validationSchema.js
import * as yup from 'yup';

const calculateAge = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const stepOneSchema = yup.object().shape({
  fullName: yup.string().required('กรุณากรอกชื่อ-นามสกุล'),
  nationalId: yup
    .string()
    .required('กรุณากรอกเลขบัตรประชาชน')
    .matches(/^\d{13}$/, 'เลขบัตรต้องมี 13 หลัก'),
  phone: yup
    .string()
    .required('กรุณากรอกเบอร์โทรศัพท์')
    .matches(/^0\d{9}$/, 'เบอร์โทรไม่ถูกต้อง'),
  dateOfBirth: yup
    .date()
    .required('กรุณาเลือกวันเกิด')
    .max(new Date(), 'วันเกิดต้องไม่ใช่อนาคต')
    .test('age', 'อายุต้องมากกว่า 0', (value) => calculateAge(value) > 0),
  age: yup
    .number()
    .required('กรุณากรอกอายุ')
    .positive('อายุต้องเป็นตัวเลขบวก')
    .integer('อายุต้องเป็นจำนวนเต็ม')
    .test('age-consistency', 'อายุไม่ตรงกับวันเกิด', function (value) {
      const { dateOfBirth } = this.parent;
      return value === undefined || value === calculateAge(dateOfBirth);
    }),
});

export const stepTwoSchema = yup.object().shape({
  address: yup.string().required('กรุณากรอกที่อยู่'),
  graduatedSchool: yup.string().required('กรุณากรอกชื่อโรงเรียนที่จบการศึกษา'),
  gpa: yup
    .number()
    .required('กรุณากรอกเกรดเฉลี่ย')
    .min(0, 'เกรดต้องไม่น้อยกว่า 0')
    .max(4, 'เกรดต้องไม่มากกว่า 4'),
  desiredProgram: yup.string().required('กรุณาเลือกแผนการเรียนที่ต้องการ'),
});
