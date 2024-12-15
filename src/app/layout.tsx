"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopAnnouncement from '@/app/components/Navbar/TopAnnoucement'
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Ensure this is added
import { Provider } from 'react-redux';
import store from './redux/store';

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Hackathon Ecommerce",
//   description: "hackathon ecommerce website",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
        <TopAnnouncement/>
        <Navbar/>
        {children}
        <Footer/>
        
<ToastContainer position="bottom-right" />
        </Provider>
        </body>
    </html>
  );
}
