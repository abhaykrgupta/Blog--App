"use client";

import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    // for (let i = 0; i < blog_data.length; i++) {
    //   if (Number(params.id) === blog_data[i].id) {
    //     setData(blog_data[i]);
    //     console.log(blog_data[i]);
    //     break;
    //   }
    // }   // code to show data from frontend
    // we are getting data from backend
    try {
      const response = await axios.get("/api/blog", {
        params: {
          id: params.id,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-4 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="bg-black text-lg rounded-md p-2 font-semibold flex items-center justify-center"
          >
            <span className="text-white mr-2">Abhay</span>
            <span className=" text-black w-14 h-9 rounded bg-white flex items-center justify-center ">
              .Blog
            </span>
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-5px_5px_0px_#000000] hover:bg-black hover:text-white transition-all duration-300">
            Get Started <Image src={assets.arrow} alt="" />{" "}
          </button>
        </div>

        {/* Centering the blog post title and author */}
        <div className="text-center my-24 max-w-[700px] mx-auto">
          <h1 className="text-2xl sm:text-5xl font-semibold mx-auto">
            {data.title}
          </h1>
          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            src={data.authorImage}
            width={60}
            height={60}
            alt=""
          />
          <p className="mt-1 pb-2 text-lg">{data.author}</p>
        </div>
      </div>

      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className="border-4 border-white mx-auto"
          src={data.image}
          width={1200}
          height={60}
          alt=""
        />
       <div className="blog-content" dangerouslySetInnerHTML={{__html:data.description}}>
              
       </div>
        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share the artical is social media
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} width={50} alt="" />
            <Image src={assets.twitter_icon} width={50} alt="" />
            <Image src={assets.googleplus_icon} width={50} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default Page;
