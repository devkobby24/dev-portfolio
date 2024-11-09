import { workExperience } from "@/data";
import React from "react";
import { Button } from "./ui/MovingBorder";
import Image from "next/image";

const Experience = () => {
  return (
    <div className="py-20" id="testimonials">
      <h1 className="heading">
        My
        <span className="text-purple"> work experience</span>
      </h1>
      <div className="w-full mt-12 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
        {workExperience.map((card) => (
          <Button
            borderRadius="1.75rem"
            className="flex-1 bg-slate-900 text-white border-slate-800"
            duration={Math.floor(Math.random() * 10000) + 10000}
            key={card.id}
          >
            <div className="flex lg:flex-row lg:items-center flex-col p-3 py-6 md:p-5 lg:p-10 gap-2">
              <Image
                src={card.thumbnail}
                alt={card.title}
                width={128}
                height={128}
                className="lg:w-32 md:w-20 w-16 object-contain"
              />
              <div className="lg:ms-5">
                <h1 className="text-start text-sm md:text-xl font-bold">
                  {card.title}
                </h1>
                <p className="text-start text-white-100 mt-3 font-semibold">
                  {card.desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Experience;
