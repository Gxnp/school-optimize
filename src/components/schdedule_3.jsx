"use client";
import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";

const Schdeule_3 = () => {
  const [showM4Regular, setShowM4Regular] = useState(false);

  return (
    <div className="container mx-auto my-8 p-4">
      <div>
        {/* Toggle for ห้องเรียนปกติ ม.4 */}
        <h2
          className="text-2xl font-medium mb-6 text-white p-3 cursor-pointer bg-[#ec4899] border border-transparent rounded-lg 2xl:text-center"
          onClick={() => setShowM4Regular(!showM4Regular)}
        >
          ห้องเรียนปกติ ม.4
        </h2>
        {showM4Regular && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <VerticalTimeline lineColor="#9ca3af">
              <VerticalTimelineElement
                contentStyle={{
                  background: "#ec4899",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                }}
                iconStyle={{ display: "none" }}
                contentArrowStyle={{
                  borderRight: "7px solid #ec4899",
                }}
              >
                <h3 className="font-semibold text-xl text-white">รับสมัคร</h3>
                <h4 className="text-lg font-medium text-white">
                  13 - 15 มี.ค. 2567
                </h4>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                contentStyle={{
                  background: "#ec4899",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                }}
                iconStyle={{ display: "none" }}
                contentArrowStyle={{
                  borderRight: "7px solid #ec4899",
                }}
              >
                <h3 className="font-semibold text-xl text-white">
                  สอบ / คัดเลือก
                </h3>
                <h4 className="text-lg font-medium text-white">
                  18 มี.ค. 2567
                </h4>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                contentStyle={{
                  background: "#ec4899",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                }}
                iconStyle={{ display: "none" }}
                contentArrowStyle={{
                  borderRight: "7px solid #ec4899",
                }}
              >
                <h3 className="font-semibold text-xl text-white">ประกาศผล</h3>
                <h4 className="text-lg font-medium text-white">
                  22 มี.ค. 2567
                </h4>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                contentStyle={{
                  background: "#ec4899",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                }}
                iconStyle={{ display: "none" }}
                contentArrowStyle={{
                  borderRight: "7px solid #ec4899",
                }}
              >
                <h3 className="font-semibold text-xl text-white">มอบตัว</h3>
                <h4 className="text-lg font-medium text-white">
                  24 มี.ค. 2567
                </h4>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Schdeule_3;
