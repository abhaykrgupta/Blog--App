import ConnectDB from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import BlogModel from "@/lib/models/userModel";
const fs = require('fs')

// Connect to the database
const LoadDb = async () => {
  await ConnectDB();
};

// Call the LoadDb function immediately
LoadDb();

// Api endpoints to get all the blogs
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  }else{
    const blogs = await BlogModel.find({})
    return NextResponse.json({blogs});
  }
}

// Create the API // api endpoints for uploading blogs
export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();

  // Extract and save the main image
  const Image = formData.get("image"); // Ensure the correct variable name
  const ImageByteData = await Image.arrayBuffer();
  const mainBuffer = Buffer.from(ImageByteData);
  const ImagePath = `./public/${timestamp}_${Image.name}`;
  await writeFile(ImagePath, mainBuffer);
  const ImageUrl = `/${timestamp}_${Image.name}`;

  // Creating the object for all form data
  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: `${ImageUrl}`, // Use the correct URL for the main image
    authorImage: "/Author_img.png", // Use the correct URL for the author image
  };

  // Save the blog data to the database
  await BlogModel.create(blogData);
  console.log("Blog Saved");

  return NextResponse.json({ success: true, msg: "Blog Added" });
}
 

// creating api endpoints to delete blogs 

export async function DELETE(request){
  const id = await request.nextUrl.searchParams.get('id');
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`,()=>{})
  await BlogModel.findByIdAndDelete(id);

  return NextResponse.json({msg: "Blog Deleted "})
}