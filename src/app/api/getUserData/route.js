import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { phone } = await req.json();

    const user = await prisma.application.findFirst({
      where: { phone },
      select: {
        title: true,
        name: true,
        nationalId: true,
        dob: true,
        age: true,
        religion: true,
        ethnicity: true,
        nationality: true,
        phone:  true,
        address: true,
        previousSchool: true,
        gpa: true,
        gradeApplyingFor: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "ไม่พบข้อมูลผู้ใช้" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์" },
      { status: 500 }
    );
  }
}
