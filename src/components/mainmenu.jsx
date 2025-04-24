import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { GraduationCap, Book, Users, Camera } from "lucide-react";
import Map from "./map";

function MainMenu() {
  const links = [
    {
      href: "https://www.tusw.ac.th/",
      icon: (
        <GraduationCap className="w-12 h-12 text-pink-500 mb-4 font-normal" />
      ),
      title: "เว็ปไซต์โรงเรียนเตรียมอุดมศึกษา สุวินทวงศ์",
      desc: "Our school is committed to providing top-notch education and fostering academic growth.",
    },
    {
      href: "https://heyzine.com/flip-book/0f6fc72a57.html",
      icon: <Book className="w-12 h-12 text-green-600 mb-4" />,
      title: "คู่มือนักเรียนและผู้ปกครอง",
      desc: "We offer a cutting-edge curriculum that prepares students for the challenges of the future.",
    },
    {
      href: "https://www.facebook.com/profile.php?id=100057578224732",
      icon: <Users className="w-12 h-12 text-blue-700 mb-4" />,
      title: "เพจโรงเรียนเตรียมอุดมศึกษา สุวินทวงศ์",
      desc: "Join a warm and inclusive community that supports every student's growth and well-being.",
    },
    {
      href: "https://www.facebook.com/profile.php?id=100068910052250",
      icon: <Camera className="w-12 h-12 text-purple-600 mb-4" />,
      title: "งานโสตทัศนศึกษา โรงเรียนเตรียมอุดมศึกษา สุวินทวงศ์",
      desc: "Our campus features state-of-the-art classrooms, labs, and sports facilities for a complete learning experience.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-16">
        <section className="mb-16 text-center">
          <h2 className="text-5xl font-bold mb-4 text-gray-800">
            TUSW Admission
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            ระบบการรับสมัครนักเรียนโรงเรียนเตรียมอุดมศึกษา สุวินทวงศ์
          </p>

          <Link
            href="/apply"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium"
          >
            Start Your Journey
          </Link>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mx-auto max-w-7xl">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardHeader>
                  {link.icon}
                  <CardTitle >
                    {link.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{link.desc}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </main>
      <Map/>
    </div>
  );
}

export default MainMenu;
