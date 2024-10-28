import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around items-center bg-black py-5 px-4">
      <div className="bg-black text-lg  p-2 font-semibold flex items-center justify-center  border outline-none border-solid border-gray shadow-[-5px_5px_0px_#000000]">
        <span className="text-lg text-white font-bold">Life & </span>
        <span className="text-black w-20 h-9 rounded bg-white flex items-center justify-center font-bold">
          Launch
        </span>
      </div>
      <p className="text-sm text-white text-center sm:text-left mt-2 sm:m-0">
        All rights reserved. copyright @Life&Launch
      </p>
      <div className="flex gap-2 mt-2 sm:mt-0">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <Image src={assets.facebook_icon} alt="Facebook" width={40} height={40} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Image src={assets.twitter_icon} alt="Twitter" width={40} height={40} />
        </a>
        <a href="https://plus.google.com" target="_blank" rel="noopener noreferrer">
          <Image src={assets.googleplus_icon} alt="Google Plus" width={40} height={40} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
