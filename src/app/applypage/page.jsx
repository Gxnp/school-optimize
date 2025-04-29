import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap } from "lucide-react";
const ApplyPage = () => {
  return (
    <div>
      <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* วงกลมตกแต่งพื้นหลัง */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-900 leading-tight tracking-tight">
            เลือกประเภทการสมัครของคุณ
          </h1>
          <p className="text-center text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
            สำรวจโปรแกรมของเราที่ออกแบบมาสำหรับระดับการศึกษาต่างๆ
            คลิกที่การ์ดเพื่อดูรายละเอียดและสมัคร
          </p>

          <div className="grid md:grid-cols-2 gap-8 rounded-2xl bg-white">
            {/* การ์ดสมัครเข้าเรียนมัธยมต้น */}
            <Card className="flex flex-col justify-between hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2">
              <div>
                <CardHeader className="text-center">
                  <BookOpen className="w-16 h-16 mx-auto text-pink-500 mb-4" />
                  <CardTitle className="text-2xl font-semibold">
                    สมัครเข้าเรียนมัธยมศึกษาตอนต้น
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-gray-700">
                    สำหรับนักเรียนที่กำลังจะเข้าสู่ชั้นมัธยมศึกษาปีที่ 1-3
                    โปรแกรมมัธยมต้นของเรามุ่งเน้นการสร้างพื้นฐานทางการศึกษาและทักษะที่จำเป็น
                  </p>
                </CardContent>
              </div>

              <Link
                href="/"
                className="text-xl py-1.5 rounded-xl flex justify-center items-center mt-auto transition ease-in-out bg-pink-500 hover:-translate-y-1 hover:scale-90 hover:bg-pink-600 duration-300 text-white"
              >
                มัธยมศึกษาตอนต้น
              </Link>
            </Card>

            {/* การ์ดสมัครเข้าเรียนมัธยมปลาย */}
            <Card className="flex flex-col justify-between hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2">
              <div>
                <CardHeader className="text-center">
                  <GraduationCap className="w-16 h-16 mx-auto text-blue-700 mb-4" />
                  <CardTitle className="text-2xl font-semibold">
                    สมัครเข้าเรียนมัธยมศึกษาตอนปลาย
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-gray-700">
                    สำหรับนักเรียนที่กำลังจะเข้าสู่ชั้นมัธยมศึกษาปีที่ 4-6
                    โปรแกรมมัธยมปลายของเรามุ่งเน้นการเตรียมตัวสู่การศึกษาต่อในระดับมหาวิทยาลัยและอื่นๆ
                    ด้วยวิชาการที่เข้มข้นและโอกาสในการทำกิจกรรมเสริม
                  </p>
                </CardContent>
              </div>
              <Link
                href="/applyform"
                className="text-xl py-1.5 rounded-xl flex justify-center items-center mt-auto transition ease-in-out bg-blue-600 hover:-translate-y-1 hover:scale-90 hover:bg-blue-700 duration-300 text-white"
              >
                มัธยมศึกษาตอนปลาย
              </Link>
            </Card>
          </div>

          {/* ปุ่มกลับไปหน้าแรก */}
          <div className="mt-16 text-center">
            <Link
              variant="outline"
              className="m-5 text-black py-2.5 px-5 rounded-xl border border-gray-400 hover:bg-gray-100 transition-all duration-300 "
              href="/"
            >
              กลับไปหน้าหลัก
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
