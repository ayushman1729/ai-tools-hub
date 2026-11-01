import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Tools Hub — Free AI Writing & Productivity Tools Suite",
  description:
    "A minimalist suite of free online AI writing tools: Text Rewriter, Paragraph Generator, Hashtag Generator, and Email Writer.",
  keywords: [
    "AI Tools",
    "AI Text Rewriter",
    "AI Paragraph Generator",
    "AI Hashtag Generator",
    "AI Email Writer",
    "Free AI Tools",
    "Content Creation",
  ],
  authors: [{ name: "AI Tools Hub Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#09090b] text-zinc-100 selection:bg-zinc-800 selection:text-white"
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
