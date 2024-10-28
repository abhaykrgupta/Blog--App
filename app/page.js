"use client";

import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <ToastContainer theme="dark" />
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <BlogList searchTerm={searchTerm} /> {/* Pass searchTerm to BlogList */}
      <Footer />
    </div>
  );
};

export default Home;
