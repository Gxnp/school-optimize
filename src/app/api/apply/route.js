import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma' // ✅ ใช้ Prisma จาก lib

export async function POST(req) {
  const data = await req.json()

  // ตรวจสอบข้อมูลซ้ำกัน (หมายเลขบัตรประชาชน และหมายเลขโทรศัพท์)
  const existing = await prisma.application.findFirst({
    where: {
      OR: [
        { nationalId: data.nationalId },
        { phone: data.phone }
      ]
    }
  })

  if (existing) {
    // ถ้ามีข้อมูลซ้ำกัน จะแสดง error ว่าซ้ำ
    if (existing.nationalId === data.nationalId) {
      return NextResponse.json({
        error: 'หมายเลขบัตรประชาชนนี้มีอยู่แล้วในระบบ',
      }, { status: 400 })
    }

    if (existing.phone === data.phone) {
      return NextResponse.json({
        error: 'หมายเลขโทรศัพท์นี้มีอยู่แล้วในระบบ',
      }, { status: 400 })
    }
  }

  // ถ้าข้อมูลไม่ซ้ำให้ทำการสร้างข้อมูลใหม่
  try {
    const application = await prisma.application.create({
      data: {
        title: data.title,
        name: data.name,
        nationalId: data.nationalId,
        dob: data.dob,
        age: data.age,
        religion: data.religion,
        ethnicity: data.ethnicity,
        nationality: data.nationality,
        phone: data.phone,
        address: data.address,
        previousSchool: data.previousSchool,
        gpa: data.gpa,
        gradeApplyingFor: data.gradeApplyingFor,
        profilePicture: data.profilePicture || '',
      },
    })

    return NextResponse.json({ message: 'Application submitted', application })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error submitting application' }, { status: 500 })
  }
}
