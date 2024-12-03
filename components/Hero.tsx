import React, { memo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Spotlight } from "./ui/Spotlight";
import { FaLocationArrow } from "react-icons/fa";
import Link from "next/link";
import MagicButton from "./ui/MagicButton";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger spotlight animation after mount
  useEffect(() => {
    setIsVisible(true); // This triggers the spotlight animation
  }, []);

  return (
    <div className="pb-5 pt-36">
      {/* <div>
        <Spotlight
          className={`-top-40 -left-10 md:-left-32 md:-top-20 h-screen ${isVisible ? "animate-spotlight" : ""}`}
          fill="white"
        />
        <Spotlight
          className={`top-40 -right-10 md:-right-32 md:-top-20 h-screen ${isVisible ? "animate-spotlight" : ""}`}
          fill="white"
        />
      </div> */}
      <div className="h-screen w-full bg-black-100 dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2] absolute top-0 left-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Welcome
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-center my-10">
            <span className="text-white">Transforming Concepts Into {" "}
            <span className="text-purple">Seamless Experiences</span></span>
          </h1>

          {/* Render MagicButton immediately */}
          <Link href="#about">
            <MagicButton
              title="Show My Work"
              icon={<FaLocationArrow />}
              position="right"
              otherClasses="gap-2"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);
