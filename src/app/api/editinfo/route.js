import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // ใช้ Prisma จาก lib

export async function POST(req) {
  try {
    const { phone } = await req.json();

    // ตรวจสอบหมายเลขโทรศัพท์จากข้อมูลที่ได้รับ
    const existing = await prisma.application.findFirst({
      where: {
        phone: phone, // ตรวจสอบแค่เบอร์โทรศัพท์
      },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "ไม่พบเบอร์โทรศัพท์ในระบบ" },
        { status: 404 }
      );
    }

    // เจอเบอร์แล้ว
    return NextResponse.json(
      { success: true, message: "พบเบอร์โทรศัพท์ในระบบ"},
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
