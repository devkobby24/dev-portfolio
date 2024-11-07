import React from "react";
import { companies, testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/MovingCards";

const Clients = () => {
  return (
    <div className="py-10" id="testimonials">
      <h1 className="heading">
        Kind words from {""}
        <span className="text-purple">colleagues and mentors</span>
      </h1>
      <div className="flex flex-col items-center max-lg:mt-10 h-auto">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
          className="h-[28rem]"
        />
      </div>
    </div>
  );
};

export default Clients;
