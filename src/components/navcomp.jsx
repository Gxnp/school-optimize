"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navcomp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Current route

  const isActive = (path) => pathname === path;

  return (
    <div className="bg-white shadow-md">
      <div className="mx-auto flex justify-between items-center px-2.5">
        <Link href="/">
          <img
            src="/tuslogo.png"
            alt="Triam Suwin Logo"
            className="h-20 w-auto cursor-pointer my-2.5"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-5 mx-2">
          {[
            { href: "/", label: "หน้าหลัก" },
            { href: "/cost", label: "ค่าบำรุงการศึกษา" },
            { href: "/schedule", label: "กำหนดการรับสมัคร" },
            { href: "/check", label: "ตรวจสอบสถานะการสมัคร" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={` rounded-2xl text-md font-semibold transition-all duration-200 p-2 ${
                isActive(href)
                  ? "text-pink-600 bg-pink-100"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/"
            className="rounded-2xl text-base font-semibold p-2 bg-blue-600 hover:bg-blue-700 transition-all duration-200"
          >
            {" "}
            สมัครเลย !{" "}
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navcomp;
