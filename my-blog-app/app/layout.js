import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import Navbar from '@/components/Navbar';

export const metadata = { title: 'My Blog', description: 'Next.js blog app' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


