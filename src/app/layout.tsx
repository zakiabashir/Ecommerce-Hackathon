import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopAnnouncement from "@/app/components/Navbar/TopAnnouncement";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Providers from "./redux/Providers";
import { ThemeProvider } from "./components/Theme/ThemeToggler";
import Script from "next/script";

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
       <head>
        {/* Chatbot Configuration Script */}
        <Script
          id="chatbot-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.embeddedChatbotConfig = {
                chatbotId: "wHot_OHfV5x8xwwbA8mZy",
                domain: "www.chatbase.co"
              };
            `,
          }}
        />
        {/* Chatbot Embed Script */}
        <Script
          src="https://www.chatbase.co/embed.min.js"
          data-chatbot-id="wHot_OHfV5x8xwwbA8mZy"
          data-domain="www.chatbase.co"
          defer
        />
      </head>
      <body className={inter.className}>
        <Providers>
        <ThemeProvider
            attribute="class"
            // defaultTheme="system"
            // enableSystem
            // disableTransiti  onOnChange
          >
          <TopAnnouncement />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
