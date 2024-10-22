import React from "react";
import { testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/MovingCards";

const Clients = () => {
  return (
    <div className="py-20" id="testimonials">
      <h1 className="heading">
        Kind words from {""}
        <span className="text-purple">colleagues and mentors</span>
      </h1>
      <div className="flex flex-col items-center">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  );
};

export default Clients;
