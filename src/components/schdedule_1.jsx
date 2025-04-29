"use client";
import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";

const Schdeule_1 = () => {
  const [showM3, setShowM3] = useState(false);

  // ฟังก์ชันเพื่อเช็คว่า path ปัจจุบันตรงกับ link นั้น ๆ หรือไม่
  return (
    <div className="container mx-auto my-8 p-4">
      <div>
        {/* Toggle for นักเรียนชั้น ม.3 */}
        <h2
          className="text-2xl font-medium mb-6 text-white p-3 cursor-pointer bg-[#7262b8] border border-transparent rounded-lg 2xl:text-center"
          onClick={() => setShowM3(!showM3)}
        >
          นักเรียนชั้น ม.3 จากโรงเรียนเดิม
        </h2>
        {showM3 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <VerticalTimeline lineColor="#9ca3af">
              <VerticalTimelineElement
                contentStyle={{
                  background: "#7262b8",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                }}
                iconStyle={{ display: "none" }}
                contentArrowStyle={{
                  borderRight: "7px solid #7262b8",
                }}
              >
                <h3 className="font-semibold text-xl text-white">รับสมัคร</h3>
                <h4 className="text-lg font-medium text-white">
                  10 - 14 ก.พ. 2567
                </h4>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                contentStyle={{
                  background: "#7262b8",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                }}
                iconStyle={{ display: "none" }}
                contentArrowStyle={{
                  borderRight: "7px solid #7262b8",
                }}
              >
                <h3 className="font-semibold text-xl text-white">
                  สอบ / คัดเลือก
                </h3>
                <h4 className="text-lg font-medium text-white">18 ก.พ. 2567</h4>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                contentStyle={{
                  background: "#7262b8",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                }}
                iconStyle={{ display: "none" }}
                contentArrowStyle={{
                  borderRight: "7px solid #7262b8",
                }}
              >
                <h3 className="font-semibold text-xl text-white">ประกาศผล</h3>
                <h4 className="text-lg font-medium text-white">20 ก.พ. 2567</h4>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                contentStyle={{
                  background: "#7262b8",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                }}
                iconStyle={{ display: "none" }}
                contentArrowStyle={{
                  borderRight: "7px solid #7262b8",
                }}
              >
                <h3 className="font-semibold text-xl text-white">มอบตัว</h3>
                <h4 className="text-lg font-medium text-white">25 ก.พ. 2567</h4>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Schdeule_1;
