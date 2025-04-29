import { NextResponse } from "next/server";
export async function PUT(req) {
    try {
      const { formData } = await req.json();
      const {
        title,
        name,
        nationalId,
        dob,
        age,
        religion,
        ethnicity,
        nationality,
        phone,
        address,
        previousSchool,
        gpa,
        gradeApplyingFor,
      } = formData; // ✅ ดึงจาก formData แทน
  
      const updatedUser = await prisma.application.updateMany({
        where: { phone },
        data: {
          title,
          name,
          nationalId,
          dob,
          age,
          religion,
          ethnicity,
          nationality,
          phone,
          address,
          previousSchool,
          gpa,
          gradeApplyingFor,
        },
      });

      console.log(updatedUser);
  
      if (updatedUser.count === 0) {
        return NextResponse.json(
          { success: false, message: "ไม่พบผู้ใช้เพื่ออัปเดต" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { success: true, message: "อัปเดตข้อมูลสำเร็จ" },
        { status: 200 }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, message: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์" },
        { status: 500 }
      );
    }
  }
  