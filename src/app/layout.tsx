import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Jackpot AI Assistant | Professional Customer Support",
  description: "Professional AI-powered chatbot for customer support and document analysis. Get instant answers to your questions with our intelligent assistant.",
  keywords: ["AI chatbot", "customer support", "document analysis", "professional assistant"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#2563EB" />
      </head>
      <body className={`${inter.className} antialiased bg-gradient-to-br from-blue-50 to-white min-h-screen`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}