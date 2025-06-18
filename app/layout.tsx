import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Q1Hang - Product Manager & AI Enthusiast",
  description: "Personal website of Q1Hang - Product Manager, AI Enthusiast. Passionate about artificial intelligence and modern web technologies.",
  keywords: ["Q1Hang", "Product Manager", "AI", "Artificial Intelligence", "Web Development", "Blog"],
  authors: [{ name: "Q1Hang" }],
  creator: "Q1Hang",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://q1hang.vercel.app",
    title: "Q1Hang - Product Manager & AI Enthusiast",
    description: "Personal website of Q1Hang - Product Manager, AI Enthusiast. Passionate about artificial intelligence and modern web technologies.",
    siteName: "Q1Hang Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Q1Hang - Product Manager & AI Enthusiast",
    description: "Personal website of Q1Hang - Product Manager, AI Enthusiast. Passionate about artificial intelligence and modern web technologies.",
    creator: "@S0lace11",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
