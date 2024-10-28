import { Playfair_Display, Roboto } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] }); // Using only 700 for headings
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] }); // Using available weights

export const metadata = {
  title: "Blog App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
import React from "react";
