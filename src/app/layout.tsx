import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopAnnouncement from "@/app/components/Navbar/TopAnnouncement";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Providers from "./redux/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hackathon Ecommerce",
  description: "Hackathon ecommerce website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <TopAnnouncement />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
