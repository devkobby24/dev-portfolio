import React, { memo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Spotlight } from "./ui/Spotlight";
import { FaLocationArrow } from "react-icons/fa";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";

const MagicButton = dynamic(() => import("./ui/MagicButton"), {
  ssr: false,
});

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation after mount
  useEffect(() => {
    setIsVisible(true); // This could trigger an animation when the component mounts
  }, []);

  return (
    <div className="pb-5 pt-36 relative">
      <div>
        <Spotlight
          className={`-top-40 -left-10 md:-left-32 md:-top-20 h-screen ${isVisible ? "animate-spotlight" : ""}`}
          fill="white"
        />
        <Spotlight
          className={`top-10 left-full w-[50vw] h-[80vh] ${isVisible ? "animate-spotlight" : ""}`}
          fill="purple"
        />
        <Spotlight
          className={`left-80 top-28 h-[80vh] w-[50vw] ${isVisible ? "animate-spotlight" : ""}`}
          fill="blue"
        />
        <Spotlight
          className={`top-40 -right-10 md:-right-32 md:-top-20 h-screen ${isVisible ? "animate-spotlight" : ""}`}
          fill="white"
        />
      </div>
      <div
        className="h-screen w-full bg-black-100 dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2] absolute top-0 left-0 flex items-center justify-center"
      >
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Welcome
          </h2>
          {/* Show TextGenerateEffect only on large screens */}
          <TextGenerateEffect
            words="Transforming Concepts Into Seamless Experiences"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />
          <a href="#about">
            <MagicButton
              title="Show My Work"
              icon={<FaLocationArrow />}
              position="right"
              otherClasses="gap-2"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);
