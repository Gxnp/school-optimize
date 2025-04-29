"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navcomp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Current route

  const isActive = (path) => pathname === path;

  return (
    <div className="sticky top-0 bg-white">
      <div className="mx-auto flex justify-between items-center px-2.5 max-w-full">
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
            { href: "/checkstatus", label: "ตรวจสอบสถานะการสมัคร" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-2xl text-md font-semibold transition-all duration-200 p-2 ${
                isActive(href)
                  ? "text-pink-600 bg-pink-100"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/applypage"
            className="text-white rounded-2xl text-base font-semibold p-2 bg-blue-600 hover:bg-blue-700 transition-all duration-200"
          >
            สมัครเลย !
          </Link>
        </nav>

        {/* Mobile Menu (Hamburger Icon) */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-pink-600 focus:outline-none z-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Animation */}
      {/* lg:hidden flex flex-col gap-4 p-4 bg-white shadow-lg transform transition-all duration-300 ease-in-out */}

      <div
        className={`lg:hidden fixed top-10 right-10 max-w-7xl bg-white/20  backdrop-blur-sm shadow-lg transform transition-all duration-300 ease-in-out rounded-xl  ${
          isOpen ? "opacity-100 z-[49]" : "opacity-0 z-[40]"
        }`}
        style={{ transformOrigin: "top" }}
      >
        <div className="flex flex-col gap-4 p-4 text-center content-center items-center">
          {[
            { href: "/", label: "หน้าหลัก" },
            { href: "/cost", label: "ค่าบำรุงการศึกษา" },
            { href: "/schedule", label: "กำหนดการรับสมัคร" },
            { href: "/checkstatus", label: "ตรวจสอบสถานะการสมัคร" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex rounded-xl text-md font-semibold p-2 ${
                isActive(href)
                  ? "text-pink-600 bg-pink-100"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setIsOpen(false)} // Close the menu after click
            >
              {label}
            </Link>
          ))}

          <Link
            href="/applypage"
            className="block text-white rounded-2xl text-base font-semibold p-2 bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsOpen(false)} // Close the menu after click
          >
            สมัครเลย !
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navcomp;
