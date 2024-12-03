"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";

const Approach=()=> {
  return (
    <section id="approach" className="w-full py-20">
        <h1 className="heading">
            My <span className="text-purple"> approach</span>
        </h1>
      <div className="my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4 mx-auto px-8 ">
        <Card 
        title="Planning & Strategy" 
        description="I focus on aligning resources and efforts across the organization to create a roadmap for sustainable growth and adaptability to changes in the environment."
        icon={<AceternityIcon order="Phase 1"/>}>
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900"
          />
        </Card>
        <Card 
        title="Development & Testing" 
        description="Coding, debugging, and conducting various tests to identify and fix issues before final deployment, ensuring that the end product meets user requirements and industry standards."
        icon={<AceternityIcon order="Phase 2"/>}>
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-black"
            colors={[
              [236, 72, 153],
              [232, 121, 249],
            ]}
            dotSize={2}
          />
        </Card>
        <Card 
        title="Evaluation & Deployment"
        description="Final testing, user feedback collection, and the implementation of the product in the target environment, ensuring a smooth transition and optimal performance." 
        icon={<AceternityIcon order="Phase 3"/>}>
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </section>
  );
}

export default React.memo(Approach);

const Card = ({
  title,
  icon,
  children,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  description?: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative md:h-[35rem] rounded-md h-[20rem]"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center absolute inset-0">
          {icon}
        </div>
        <h2 className="dark:text-white text-2xl mb-4 text-center opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
        <p className="text-white text-sm text-center opacity-0 group-hover/canvas-card:opacity-100 relative z-10 group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200" style={{ color: "#e4ecff" }}>{description}</p>
      </div>
    </div>
  );
};

const AceternityIcon = ({ order }: { order?: string }) => {
  return (
    <div className="flex items-center justify-center">
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            {order}
        </button>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
