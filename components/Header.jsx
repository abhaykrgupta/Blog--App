import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Header = ({setSearchTerm, searchTerm}) => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // formdata object
    // we will add input filed value
    formData.append("email", email);

    try {
      const response = await axios.post("/api/email", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail('');
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
      console.error("Subscription error:", error);
    }
  };

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Link
          href="/"
          className="bg-black text-lg  p-2 font-semibold flex items-center justify-center  border outline-none border-solid border-gray shadow-[-5px_5px_0px_#000000]"
        >
          <span className="text-white mr-2">Life & </span>
          <span className="text-black w-16 h-9 rounded bg-white flex items-center justify-center">
            Launch
          </span>
        </Link>
       <div className="flex gap-3">
         {/* Search input field */}
         <input 
          type="text" 
          placeholder="Search blogs..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className=" sm:w-[250px] md:w-[350px] p-3 items-center border outline-none border-solid border-black shadow-[-5px_5px_0px_#000000]"
        />

       </div>
      </div>
      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-10 max-w-[740px] mx-auto text-xs sm:text-base'>
        Welcome to our blog! Dive into the latest insights, trends, and stories across various topics that matter to you. Whether you’re looking for tech tips, lifestyle inspiration, or startup advice, we have something for everyone.
        </p>
        <form 
          onSubmit={onSubmitHandler} 
          className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-5px_5px_0px_#000000]'
        >
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            type='email' 
            placeholder='Enter your Email' 
            className='pl-4 outline-none' 
          />
          <button 
            type='submit' 
            className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
