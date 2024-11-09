import React from "react";
import MagicButton from "./ui/MagicButton";
import { BiLinkExternal } from "react-icons/bi";
import { socialMedia } from "@/data";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 " id="contact">
      <div className="flex flex-col items-center">
        <a href="mailto:nanakobby2002@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<BiLinkExternal />}
            position="right"
            otherClasses="gap-2"
          />
        </a>
      </div>

      <div className="flex mt-16 flex-col md:flex-row items-center justify-between space-y-3">
        <p className="text-center text-white-100 text-sm md:text-base font-light">
          Copyright © - All rights reserved
        </p>
        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((item) => (
            <div
              key={item.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-blur-lg backdrop-filter saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <a href={item.link} target="_blank">
                <img src={item.img} alt={item.img} width={20} height={20} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
