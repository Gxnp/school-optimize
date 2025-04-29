import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma' // ✅ ใช้ Prisma จาก lib เหมือนเดิม

export async function POST(req) {
  try {
    const { phoneNumber } = await req.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, message: "กรุณากรอกเบอร์โทรศัพท์" },
        { status: 400 }
      );
    }

    // หาเบอร์โทรใน database
    const existing = await prisma.application.findFirst({
      where: {
        phone: phoneNumber,
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
      { success: true, message: "พบเบอร์โทรศัพท์ในระบบ", nextStep: "otp" },
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
