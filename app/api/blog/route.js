import ConnectDB from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import BlogModel from "@/lib/models/userModel";

// Connect to the database
const LoadDb = async () => {
  await ConnectDB();
};

// Call the LoadDb function immediately
LoadDb();

export async function GET(request) {
  return NextResponse.json({ abhay: "API Working" });
}

// Create the API for handling POST requests
export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();

  // Extract and save the main image
  const mainImage = formData.get("image"); // Ensure the correct variable name
  const mainImageByteData = await mainImage.arrayBuffer();
  const mainBuffer = Buffer.from(mainImageByteData);
  const mainImagePath = `./public/${timestamp}_${mainImage.name}`;
  await writeFile(mainImagePath, mainBuffer);
  const mainImageUrl = `/${timestamp}_${mainImage.name}`;

  // Extract and save the author image
  const authorImage = formData.get("authorImage");
  const authorImageByteData = await authorImage.arrayBuffer();
  const authorBuffer = Buffer.from(authorImageByteData);
  const authorImagePath = `./public/${timestamp}_${authorImage.name}`;
  await writeFile(authorImagePath, authorBuffer);
  const authorImageUrl = `/${timestamp}_${authorImage.name}`;

  // Creating the object for all form data
  const blogData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    author: formData.get("author"),
    image: mainImageUrl, // Use the correct URL for the main image
    authorImage: authorImageUrl, // Use the correct URL for the author image
  };

  // Save the blog data to the database
  await BlogModel.create(blogData);
  console.log("Blog Saved");

  return NextResponse.json({ success: true, msg: "Blog Added" });
}
