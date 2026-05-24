import { workExperience } from "@/data";
import React from "react";
import { Button } from "./ui/MovingBorder";
import Image from "next/image";

const Experience = () => {
  return (
    <div className="py-20" id="experience">
      <h1 className="heading">
        My
        <span className="text-violet-600 dark:text-purple"> work experience</span>
      </h1>
      <div className="w-full mt-12 grid grid-cols gap-5">
        {workExperience.map((card) => (
          <Button
            borderRadius="1.75rem"
            className="flex-1 bg-card text-card-foreground border-border"
            duration={Math.floor(Math.random() * 10000) + 10000}
            key={card.id}
          >
            <div className="flex lg:flex-row lg:items-center flex-col p-3 py-6 md:p-5 lg:p-10 gap-2">
              <Image
                src={card.thumbnail}
                alt={card.title}
                width={128}
                height={128}
                className="w-16 object-cover"
              />
              <div className="lg:ms-5">
                <h1 className="text-start text-sm md:text-xl font-bold">
                  {card.title}
                </h1>
                <p className="text-start text-muted-foreground mt-3 font-medium">
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

export default React.memo(Experience);
