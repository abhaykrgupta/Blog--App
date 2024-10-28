import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around items-center bg-black py-5 px-4">
      <div className="flex items-center gap-1 border rounded-sm p-2">
        <span className="text-lg text-white font-bold">Life & </span>
        <span className="text-black w-20 h-9 rounded bg-white flex items-center justify-center font-bold">
          Launch
        </span>
      </div>
      <p className="text-sm text-white text-center sm:text-left mt-2 sm:m-0">
        All rights reserved. copyright @Life&Launch
      </p>
      <div className="flex gap-2 mt-2 sm:mt-0">
        <Image src={assets.facebook_icon} alt="Facebook" width={40} height={40} />
        <Image src={assets.twitter_icon} alt="Twitter" width={40} height={40} />
        <Image src={assets.googleplus_icon} alt="Google Plus" width={40} height={40} />
      </div>
    </div>
  );
};

export default Footer;
