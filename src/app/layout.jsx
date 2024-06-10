import "./globals.css";
import local from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
export const spartan = local({
  subsets: "latin",
  src: "./fonts/LeagueSpartan-VariableFont_wght.ttf",
  variable: "--spartan",
});
export const righteous = local({
  src: "./fonts/Righteous-Regular.ttf",
  variable: "--righteous",
});
export const josefin = local({
  src: "./fonts/JosefinSans-VariableFont_wght.ttf",
  variable: "--josefin",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spartan.variable} ${righteous.variable} ${josefin.variable} ${josefin.className} bg-merah-100`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
