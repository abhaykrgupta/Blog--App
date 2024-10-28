"use server"
import EmailModel from "@/lib/models/EmailModels";
import ConnectDB from "@/lib/config/db";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnectDB();
};

export async function POST() {
  await LoadDB(); // Ensure the database connection is established before proceeding
  try {
    // Fetch all the subscriber emails from the database
    const subscribers = await EmailModel.find({});
    const emails = subscribers.map((subscriber) => subscriber.email);

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOption = {
      from: `"Life & Launch" <${process.env.EMAIL_USER}>`, // Use the environment variable for the sender's email
      to: emails,
      subject: `New Blog Post Alert!`,
      text: `A new blog has been published! Check it out on our website.`,
      html: `<p>A new blog has been published! <a href="https://blog-alpha-seven-95.vercel.app/">Check it out here.</a></p>`,
    };

    // Send email to all subscribers
    await transporter.sendMail(mailOption); // Corrected the variable name here
    return NextResponse.json({
      success: true,
      msg: "Notification sent to all subscribers.",
    });
  } catch (error) {
    console.log("Notification error:", error);
    return NextResponse.json({
      success: false,
      msg: "Failed to send notification.",
    });
  }
}
