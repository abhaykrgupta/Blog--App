"use client";

import { assets } from "@/Assets/assets";
import Image from "next/image";
import React, { useState } from "react"; // Import useState from React
import { toast } from "react-toastify";
import axios from "axios";

const AddProduct = () => {
  const [image, setImage] = useState(null); // Initialize image state as null
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    author: "Abhay",
    authorImg: "/Author_img.png",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);

        // Reset form fields after successful submission
        setImage(null); // Reset image to null instead of false
        setData({
          title: "", 
          description: "",
          category: "",
          author: "Abhay",
          authorImg: "/Author_img.png",
        });
      } else {
        toast.error("Error: " + response.data.msg);
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-4"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={60}
            alt="Upload Thumbnail"
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
          className="mt-2"
        />
        <p className="text-xl mt-4">Blog Title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Text Here....."
          required
        />
        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          rows={6}
          placeholder="Write Content here....."
          required
        />
        <p className="text-xl mt-4">Blog Category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
          required
        >
          <option value="" disabled>Select Category</option>
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          ADD
        </button>
      </form>
    </>
  );
};

export default AddProduct;
