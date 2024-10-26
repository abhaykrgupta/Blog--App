import { assets } from "@/Assets/assets";
import React from "react";
import Image from "next/image";
const BlogTableitem = ({authorImage,title,deleteBlog, mongoId,  author ,date}) => {
    const Blogdate = new Date(date)
  return(
    <tr className="bg-white border-b ">
      <th scope="row" className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        <Image height={40} width={40} src={authorImage?authorImage:assets.profile_icon}/>
         <p>{author?author:"No Author"}</p>
      </th>
      <td  className=" px-6 py-4 ">
         {title?title:"no title"}
      </td>
      <td className=" px-6 py-4 ">
        {Blogdate.toString()}
      </td>
      <td onClick={()=>deleteBlog(mongoId)} className=" px-6 py-4 cursor-pointer ">
         x
      </td>
    </tr> 
  )
};

export default BlogTableitem;
 