"use client";
import BlogTableitem from "@/components/adminComponents/BlogTableitem";
import axios from "axios";
import React from "react";
import {useEffect, useState } from "react";
import { toast } from "react-toastify";

const blogList = () => {
   const [blogs, setBlogs] = useState([]);
   
   const fetchBlogs = async () =>{
    const response = await axios.get("/api/blog")
    setBlogs(response.data.blogs)
   }
   // delete blog
  const deleteBlog = async (mongoId) =>{
    const response = await axios.delete('/api/blog',{
     params:{
       id:mongoId
     }
    })
    toast.success(response.data.msg );
    fetchBlogs();
 }

   useEffect(()=>{
    fetchBlogs();
   },[])
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrolbar-hide">
        <table className="w-full text-sm text-gray-500 ">
          <thead className="text-sm tex-gray-700 text-left uppercase bg-gray-200 width-full">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3 ">
                Author name
              </th>
              <th scope="col" className="px-6 py-3 ">
                Title
              </th>
              <th scope="col" className="px-6 py-3 ">
                Date
              </th>
              <th scope="col" className=" px-6 py-3 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item,index)=>{
              return   <BlogTableitem key={index} mongoId={item._id} title={item.title} author={item.author} authorImage={item.authorImage} date={item.date} deleteBlog={deleteBlog} />
            })}
          
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default blogList;
