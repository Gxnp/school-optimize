import Schdeule_1 from "@/components/schdedule_1";
import Schdeule_2 from "@/components/schdedule_2";
import Schdeule_3 from "@/components/schdedule_3";
import React from "react";
import "react-vertical-timeline-component/style.min.css";

const Schedule = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white ">
        <Schdeule_1 />
        <hr className="border-2 border-gray-400 "/>
        <Schdeule_2 />
        <hr className="border-2 border-gray-400 "/>
        <Schdeule_3 />
    </div>
  );
};

export default Schedule;
